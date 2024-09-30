import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Load Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51Q2b4x2K0tUYg45a9Q2G5xVdzqBDoYIUNH9KOl4a0c1eITUUf897ckHH3KnB6WM8NwYR9mDzS3u80xcwX3rKVx8f00pz2gWygO"
);

interface TicketPurchaseFormProps {
  ticketPrice: number;
  receipt_email: string;
}

export const TicketPurchaseForm: React.FC<TicketPurchaseFormProps> = ({
  ticketPrice = 10,
  setPaymentSuccess,
  receipt_email,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Fetch the payment intent from the backend
  const fetchPaymentIntent = async () => {
    console.log(receipt_email, ticketPrice, 'receipt email, ticketprice')
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/payment/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketPrice, receipt_email }), // Send ticket price to backend
      }
    );

    const data = await response.json();
    setClientSecret(data.clientSecret); // Set clientSecret from backend
  };

  // Handle form submission for payment
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return; // Stripe.js has not loaded yet or there's no clientSecret
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    // Confirm the payment with the clientSecret and card details
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Payment failed:", error.message);
    } else if (paymentIntent?.status === "succeeded") {
      console.log("Payment successful:", paymentIntent);
      setPaymentSuccess(true);
      // Handle post-payment actions, such as issuing tickets or confirmation
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Purchase Ticket</h2>
      <p className="text-lg mb-4 text-center">Total: £{ticketPrice}</p> {/* Display the price */}


      <button
        onClick={fetchPaymentIntent}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
      >
        Fetch Payment Intent
      </button>

      {clientSecret && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                },
              }}
              className="p-2"
            />
          </div>

          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
          >
            Confirm Payment
          </button>
        </form>
      )}



    </div>
  );
};

// Wrap the form with Stripe's Elements provider
const paymentApp: React.FC<{ ticketPrice: number }> = ({ ticketPrice }) => (
  <Elements stripe={stripePromise}>
    <TicketPurchaseForm ticketPrice={ticketPrice} />
  </Elements>
);

export default paymentApp;
