import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authContext, { AuthContextType } from "../context/auth-context";
import { useAxios } from "../components/hooks/useAxios";
import AddToGoogleCalendarButton from "../components/AddToGoogleCalendarButton";
import { format, intervalToDuration, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import { PiCalendarX } from "react-icons/pi";
import { PiCalendarCheck } from "react-icons/pi";
import { TbLocationCheck } from "react-icons/tb";
import { TbCalendarClock } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import LoadingSpinner from "../components/LoadingSpinner";
import { TicketPurchaseForm } from "./PaymentPage";

import { APIProvider } from "@vis.gl/react-google-maps";

import App from "../components/PaymentComponent";
import CustomMap from "../components/CustomMap";
import AttendeeCard from "../components/AttendeeCard";
import EventButtons from "../components/EventButtons";

type Props = {};

interface Attendee {
  userId: string;
  username: string;
}

interface Tag {
  tagName: string;
}

interface Event {
  _id: string;
  name: string;
  attendees: Attendee[];
  tags: Tag[];
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  ticketPrice: number;
}

function SingleEventPage({}: Props) {
  const [event, setEvent] = useState<Event>();
  const [showMap, setShowMap] = useState<boolean>(false);
  const { eventId } = useParams();
  const auth = useContext(authContext) as AuthContextType | null;
  const [paymentSucess, setPaymentSuccess] = useState<boolean>(false);
  const { response, error, errorMessage, isLoading, sendRequest } = useAxios();

  const navigate = useNavigate();

  if (!auth) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  useEffect(() => {
    const getSingleEvent = async () => {
      const response = await sendRequest(`/events/${eventId}`);
      console.log(response.data.event);
      setEvent(response.data.event);
    };

    getSingleEvent();
  }, []);

  const joinEventHandler = async () => {
    const response = await sendRequest(`/events/join/${eventId}`, "POST", {
      userId: auth.userId,
      username: auth.email,
    });
    setEvent(response.data.foundEvent);
  };

  const leaveEventHandler = async () => {
    const response = await sendRequest(`/events/leave/${eventId}`, "POST", {
      userId: auth.userId,
    });

    setEvent(response.data.foundEvent);
  };

  const deleteEventHandler = async () => {
    try {
      const response = await sendRequest(`/events/${eventId}`, "DELETE");

      console.log(response);
      navigate("/events");
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message, "response");
    }
  };

  if (isLoading || !event) {
    return <LoadingSpinner />;
  }

  const originalStartDateString = event.startDate;
  const parsedStartDate = parseISO(originalStartDateString);
  const formattedStartDate = format(parsedStartDate, "do MMMM yyyy, h:mm a", {
    locale: enGB,
  });

  const originalEndDateString = event.endDate;
  const parsedEndDate = parseISO(originalEndDateString);
  console.log(parsedEndDate);
  const formattedEndDate = format(parsedEndDate, "do MMMM yyyy, h:mm a", {
    locale: enGB,
  });

  const timeBetweenDates = intervalToDuration({
    start: new Date(parsedStartDate),
    end: new Date(parsedEndDate),
  });

  console.log(timeBetweenDates, "time between dates");

  let disabledButton;

  if (event) {
    disabledButton = event.attendees.some((a) => a.userId === auth.userId);
  }

  const checkEventPastDate = (startDate: string) => {
    let currentDate = new Date();
    let eventStartDate = new Date(startDate);

    if (currentDate > eventStartDate) {
      return true;
    } else {
      return false;
    }
  };

  const userIsAttending = event.attendees.some(
    (attendee) => attendee.userId === auth.userId
  );

  return (
    <div className="m-2">
      {isLoading && <p className="text-3xl">Loading...</p>}

      <div className="">
        <img
          src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F787493499%2F1149086973953%2F1%2Foriginal.20240611-155129?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=880b1ec98629e1e890e363f4e5c9a3f4"
          alt=""
          className="rounded-md m-auto"
        />
      </div>

      {checkEventPastDate(event.startDate) ? (
        <div className="w-full">
          <div className="border-2 bg-yellow-50 border-yellow-400 rounded-md mx-10 my-4 p-2 h-14 flex gap-4 items-center">
            <div className="pl-2">
              <PiCalendarX size={26} />
            </div>

            <div>
              <h3 className="font-light">Sales Ended</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-10 my-4"></div>
      )}

      <div className="w-full justify-center sm:flex">
        {/* main div */}

        <div className="max-w-3xl">
          {/* left div */}

          <div className="p-2 my-4">
            <h1 className="font-semibold">{formattedStartDate}</h1>

            <h1 className="text-3xl font-extrabold pt-2">{event.name}</h1>

            <p className="font pt-2">{event.description}</p>

            {/* <h1>Hosted By...</h1> */}
          </div>

          <div className="p-2 my-4">
            <h1 className="font-extrabold text-2xl">Date and time</h1>

            <div className="mt-2 flex gap-2 items-center">
              <PiCalendarCheck size={20} />

              <h1 className="font">
                {formattedStartDate} - {formattedEndDate}
              </h1>
            </div>
          </div>

          <div className="p-2 my-4">
            <h1 className="font-extrabold text-2xl">Location</h1>

            <div className="mt-2 flex gap-2 items-center">
              <div className="w-full">
                <div className="flex gap-2">
                  <TbLocationCheck size={20} />
                  <h1 className="font">{event.location}</h1>
                </div>
                <p
                  className="text-xs font-semibold text-blue-500 cursor-pointer"
                  onClick={() => setShowMap(!showMap)}
                >
                  {showMap ? "Hide map" : "Show map"}
                </p>

                {showMap && (
                  <div>
                    <CustomMap location={event.location} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-2 my-4">
            <h1 className="font-extrabold text-2xl">About this event</h1>

            <div className="mt-2 flex gap-2 items-center">
              <TbCalendarClock size={20} color="green" />

              <h1 className="font">
                {`Duration ${Object.values(timeBetweenDates)} ${Object.keys(
                  timeBetweenDates
                )}`}
              </h1>
            </div>
          </div>

          <div className="p-2 my-4">
            <h1 className="font-extrabold text-2xl">Tags</h1>

            <div className="mt-2 flex gap-2 items-center">
              <IoPricetagsOutline size={20} />

              {event.tags.map((tag) => {
                return (
                  <div className="bg-gray-100 rounded-xl p-2">
                    <p>{tag}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {auth.isStaff && (
            <div>
              <button className="btn btn-error" onClick={deleteEventHandler}>
                Delete Event
              </button>

              {error && (
                <h1 className="text-lg font-bold pt-2">Error {errorMessage}</h1>
              )}
            </div>
          )}
        </div>

        <div className="min-w-96">
          {/* right div */}

          <AttendeeCard attendees={event.attendees} />

          {event.ticketPrice <= 0 && !userIsAttending && (
            <EventButtons
              joinEventHandler={joinEventHandler}
              leaveEventHandler={leaveEventHandler}
              disabledButton={disabledButton}
            />
          )}

          {userIsAttending && (
            <EventButtons
              joinEventHandler={joinEventHandler}
              leaveEventHandler={leaveEventHandler}
              disabledButton={disabledButton}
            />
          )}

          {/* {event.ticketPrice > 0 && <App setPaymentSuccess={setPaymentSuccess}/>} */}
          {event.ticketPrice > 0 && !paymentSucess && !userIsAttending && (
            <TicketPurchaseForm setPaymentSuccess={setPaymentSuccess} ticketPrice={event.ticketPrice} receipt_email={auth.email} />
          )}

          {paymentSucess && !userIsAttending && (
            <EventButtons
              joinEventHandler={joinEventHandler}
              leaveEventHandler={leaveEventHandler}
              disabledButton={disabledButton}
            />
          )}

          {/* if user is in attendee list, show add to g calendar */}
          {userIsAttending && <AddToGoogleCalendarButton event={event} />}
        </div>
      </div>
    </div>
  );
}

export default SingleEventPage;
