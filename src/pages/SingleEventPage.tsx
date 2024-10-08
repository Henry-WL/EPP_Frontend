import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authContext, { AuthContextType } from "../context/auth-context";
import { useAxios } from "../components/hooks/useAxios";
import AddToGoogleCalendarButton from "../components/AddToGoogleCalendarButton";
import { Duration, format, intervalToDuration, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import { PiCalendarX } from "react-icons/pi";
import { PiCalendarCheck } from "react-icons/pi";
import { TbLocationCheck } from "react-icons/tb";
import { TbCalendarClock } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import LoadingSpinner from "../components/LoadingSpinner";
import { TicketPurchaseForm } from "./PaymentPage";

import CustomMap from "../components/CustomMap";
import AttendeeCard from "../components/AttendeeCard";
import EventButtons from "../components/EventButtons";
import { AxiosError } from "axios";

type Props = {};

interface Attendee {
  userId: string;
  username: string;
}

interface filmObject {
  Poster: string
}

interface Event {
  _id: string;
  name: string;
  attendees: Attendee[];
  tags: string[];
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  ticketPrice: number;
  payWant: boolean;
  filmData: filmObject;
}

function SingleEventPage({}: Props) {
  const [event, setEvent] = useState<Event>();
  const [showMap, setShowMap] = useState<boolean>(false);
  const [payWantVal, setPayWantVal] = useState<string>("");
  const { eventId } = useParams();
  const auth = useContext(authContext) as AuthContextType | null;
  const [paymentSucess, setPaymentSuccess] = useState<boolean>(false);
  const { error, errorMessage, isLoading, sendRequest } = useAxios();

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
      const axiosError = err as AxiosError;

      if (axiosError.response) {
        // Assert the type of response.data to be an object with a 'message' field
        const errorMessage = (axiosError.response.data as { message: string }).message;
        console.log(errorMessage, "response");
      } else {
        console.log("An unexpected error occurred", axiosError.message);
      }
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

  const formatDuration = (duration:Duration) => {
    const { years, months, days, hours, minutes, seconds } = duration;
    const parts = [];
  
    if (years) parts.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months) parts.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds) parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);

    return parts.length ? parts.join(', ') : 'No duration';
  };

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
          // src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F787493499%2F1149086973953%2F1%2Foriginal.20240611-155129?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=880b1ec98629e1e890e363f4e5c9a3f4"
          src={event.filmData.Poster || "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F787493499%2F1149086973953%2F1%2Foriginal.20240611-155129?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=880b1ec98629e1e890e363f4e5c9a3f4"}
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
              {`Duration: ${formatDuration(timeBetweenDates)}`}
              </h1>
            </div>
          </div>

          <div className="p-2 my-4">
            <h1 className="font-extrabold text-2xl">Tags</h1>

            <div className="mt-2 flex gap-2 items-center">
              <IoPricetagsOutline size={20} />

              {event.tags.map((tag) => {
                console.log(typeof(tag), 'taggggg')
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
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn btn-error"
                onClick={() => {
                  const modal = document.getElementById("my_modal_2");
                  if (modal) {
                    (modal as HTMLDialogElement).showModal(); // Type assertion to treat it as a dialog element
                  }
                }}
              >
                Delete Event
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">
                    Confirm below to delete event
                  </h3>
                  <button
                    className="btn btn-error mt-4"
                    onClick={deleteEventHandler}
                  >
                    Delete Event
                  </button>

                  <p className="py-4 text-sm">
                    Press ESC key or click outside to close
                  </p>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

              {error && (
                <h1 className="text-lg font-bold pt-2">Error {errorMessage}</h1>
              )}
            </div>
          )}
        </div>

        <div className="min-w-96">
          {/* right div */}

          <AttendeeCard attendees={event.attendees} />

          {!checkEventPastDate(event.startDate) && (
            <div>
              {event.payWant && !paymentSucess && !userIsAttending && (
                <div>
                  <div className="form-control mb-4">
                    <label htmlFor="ticketprice" className="label">
                      <span className="label-text font-bold">
                        Pay what you want below
                      </span>
                    </label>
                    <input
                      id="ticketprice"
                      name="ticketprice"
                      type="number"
                      // disabled={payWant}
                      value={payWantVal}
                      onChange={(e) => setPayWantVal(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter ticket price"
                      autoComplete="email"
                      // required
                    />
                  </div>
                  <TicketPurchaseForm
                    setPaymentSuccess={setPaymentSuccess}
                    ticketPrice={payWantVal}
                    receipt_email={auth.email || ""}
                  />
                </div>
              )}

              {event.ticketPrice <= 0 &&
                !userIsAttending &&
                event.payWant == false && (
                  <EventButtons
                    joinEventHandler={joinEventHandler}
                    leaveEventHandler={leaveEventHandler}
                    disabledButton={disabledButton ?? false}
                  />
                )}

              {userIsAttending && (
                <EventButtons
                  joinEventHandler={joinEventHandler}
                  leaveEventHandler={leaveEventHandler}
                  disabledButton={disabledButton ?? false}
                />
              )}

              {/* {event.ticketPrice > 0 && <App setPaymentSuccess={setPaymentSuccess}/>} */}
              {event.ticketPrice > 0 && !paymentSucess && !userIsAttending && (
                <TicketPurchaseForm
                  setPaymentSuccess={setPaymentSuccess}
                  ticketPrice={event.ticketPrice.toString()}
                  receipt_email={auth.email || ""}
                />
              )}

              {paymentSucess && !userIsAttending && (
                <EventButtons
                  joinEventHandler={joinEventHandler}
                  leaveEventHandler={leaveEventHandler}
                  disabledButton={disabledButton ?? false}
                />
              )}

              {/* if user is in attendee list, show add to g calendar */}
              {userIsAttending && <AddToGoogleCalendarButton event={event} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleEventPage;
