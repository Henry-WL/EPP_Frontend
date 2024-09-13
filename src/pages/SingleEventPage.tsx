import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authContext from "../context/auth-context";
import { useAxios } from "../components/hooks/useAxios";
import AddToGoogleCalendarButton from "../components/AddToGoogleCalendarButton";

type Props = {};

function SingleEventPage({}: Props) {
  const [event, setEvent] = useState();
  const { eventId } = useParams();
  const auth = useContext(authContext);
  const { response, error, isLoading, sendRequest } = useAxios();

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
        <img src="https://flowbite-react.com/images/blog/image-1.jpg" alt="" />
      </div>
      <div>
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

      <div>
        {!isLoading && event && (
          <div>
            <h1 className="text-3xl">{event.startDate}</h1>
            <h1 className="text-3xl">{event.endDate}</h1>
            <h1 className="text-3xl">{event.description}</h1>
          </div>
        )}
      </div>

      <h1 className="underline text-xl">Attendees</h1>

      {!isLoading &&
        event &&
        event.attendees.map((attendee) => {
          return <p>{attendee.username}</p>;
        })}
      {!isLoading && event && <AddToGoogleCalendarButton event={event} />}
    </div>
  );
}

export default SingleEventPage;
