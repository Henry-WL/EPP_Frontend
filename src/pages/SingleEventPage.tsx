import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authContext, { AuthContextType } from "../context/auth-context";
import { useAxios } from "../components/hooks/useAxios";
import AddToGoogleCalendarButton from "../components/AddToGoogleCalendarButton";
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";

type Props = {};

interface Attendee {
  userId: string;
  username: string;
}

interface Event {
  _id: string;
  name: string;
  attendees: Attendee[];
  location: string;
  description: string;
  startDate: string;
  endDate: string;
}

function SingleEventPage({}: Props) {
  const [event, setEvent] = useState<Event>();
  const { eventId } = useParams();
  const auth = useContext(authContext) as AuthContextType | null;
  const { response, error, isLoading, sendRequest } = useAxios();

  if (!auth) {
    return <p>Loading...</p>;
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

  if (isLoading || !event) {
    return <p>Loading event...</p>;
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

  let disabledButton;

  if (event) {
    disabledButton = event.attendees.some((a) => a.userId === auth.userId);
    console.log(disabledButton);
  }

  console.log(disabledButton);

  return (
    <div className="m-2">
      {isLoading && <p className="text-3xl">Loading...</p>}

      <div>
        <img
          src="https://flowbite-react.com/images/blog/image-1.jpg"
          alt=""
          className="h-96 w-full rounded-md"
        />
      </div>

      <h1>Hosted By...</h1>

      <div>
        {!isLoading && event && (
          <div>
            <h1 className="text-xl">{formattedStartDate}</h1>
            <h1 className="text-xl">{formattedEndDate}</h1>
            <h1 className="text-xl">{event.description}</h1>
          </div>
        )}
      </div>

      <div className="border-2 border-gray-500 p-1 rounded-md">
        <button
          onClick={joinEventHandler}
          className="p-2 bg-green-400 rounded-md"
          disabled={disabledButton}
        >
          Join Event
        </button>

        <button
          onClick={leaveEventHandler}
          className="p-2 bg-red-400 rounded-md"
          disabled={!disabledButton}
        >
          Leave Event
        </button>

        <button
          onClick={() => console.log("like")}
          className="p-2 bg-pink-400 rounded-md"
        >{`Like event <3`}</button>
      </div>

      {!isLoading && event && <p>{event.location}</p>}

      <div className="flex">
        <div className="h-96 w-96 bg-red-500">MAP</div>

        <div>
          <h1 className="underline text-xl">Attendees</h1>
          {!isLoading &&
            event &&
            event.attendees.map((attendee) => {
              return <p>{attendee.username}</p>;
            })}
        </div>
      </div>

      {!isLoading && event && <AddToGoogleCalendarButton event={event} />}
    </div>
  );
}

export default SingleEventPage;
