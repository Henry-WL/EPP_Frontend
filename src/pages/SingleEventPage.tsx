import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authContext from "../context/auth-context";
import { useAxios } from "../components/hooks/useAxios";

type Props = {};

function SingleEventPage({}: Props) {
  const [event, setEvent] = useState();
  const { eventId } = useParams();
  const auth = useContext(authContext);
  const { response, error, isLoading, sendRequest } = useAxios();

  console.log(auth)

  console.log(eventId)

  useEffect(() => {
    const getSingleEvent = async () => {
      const response = await sendRequest(`/events/${eventId}`)
      console.log(response.data.event);
      setEvent(response.data.event);
      // kmkn

    };

    getSingleEvent();
  }, []);

  const joinEventHandler = async () => {
    console.log(eventId);

    const response = await axios.post(
      `http://localhost:3000/api/events/join/${eventId}`,
      {
        userId: auth.userId,
        username: auth.email,
      }
    );

    console.log(response);
  };

  const leaveEventHandler = async () => {
    console.log("first");

    const response = await axios.post(
      `http://localhost:3000/api/events/leave/${eventId}`,
      {
        userId: auth.userId,
      }
    );

    console.log(response);
  };

  return (
    <div>
      {isLoading && <p className="text-3xl">Loading...</p>}

      <h1>{eventId}</h1>

      <div>
        <img src="https://flowbite-react.com/images/blog/image-1.jpg" alt="" />
      </div>

      {!isLoading && event && <p>{event.location}</p>}


      <h1 className="underline text-xl">Attendees</h1>

      {!isLoading && event &&
        event.attendees.map((attendee) => {
          return <p>{attendee.username}</p>;
        })}

      <div>
        <button
          onClick={joinEventHandler}
          className="p-2 bg-green-400 rounded-md"
        >
          Join Event
        </button>

        <button
          onClick={leaveEventHandler}
          className="p-2 bg-red-400 rounded-md"
        >
          Leave Event
        </button>
      </div>
    </div>
  );
}

export default SingleEventPage;
