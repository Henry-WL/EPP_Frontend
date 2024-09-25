import Example from "./components/Navbar";
import AuthenticatedRoutes from "./pages/AuthenticatedRoutes";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51Q2b4x2K0tUYg45a9Q2G5xVdzqBDoYIUNH9KOl4a0c1eITUUf897ckHH3KnB6WM8NwYR9mDzS3u80xcwX3rKVx8f00pz2gWygO');


const App = () => {
  return (
    <div className="">
      <Elements stripe={stripePromise}>

      <Example />

      <AuthenticatedRoutes />

      </Elements>
    </div>
  );
};

export default App;
