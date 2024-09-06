import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authContext from "../context/auth-context";

type Props = {};

function SingleEventPage({}: Props) {
    const [event, setEvent] = useState()
    const [loading, setLoading] = useState(true)
  const { eventId } = useParams();
  const auth = useContext(authContext)

  console.log(auth)


  console.log(eventId);

  useEffect(() => {
    const getSingleEvent = async () => {
        const response = await axios.get(`http://localhost:3000/events/${eventId}`)
        console.log(response.data.event)
        setEvent(response.data.event)
        setLoading(false)
    }

    getSingleEvent()
  }, [])

  const joinEventHandler = async () => {
    console.log(eventId)

    const response = await axios.post(`http://localhost:3000/events/join/${eventId}`, 
      {
          "userId": auth.userId,
          "username": auth.email
        }

  )

  console.log(response)
  }

  const leaveEventHandler = async () => {
    console.log('first')

    const response = await axios.post(`http://localhost:3000/events/leave/${eventId}`, 
      {
          "userId": auth.userId,

        }

  )

  console.log(response)
  }

  return (
    <div>

        {loading && <p>Loading...</p>}

      <h1>{eventId}</h1>

      <div>
        <img src="https://flowbite-react.com/images/blog/image-1.jpg" alt="" />

      </div>

        {!loading && <p>{event.location}</p>}


        <div>
            <button onClick={joinEventHandler} className="p-2 bg-green-400 rounded-md">Join Event</button>


            <button onClick={leaveEventHandler} className="p-2 bg-red-400 rounded-md">Leave Event</button>
        </div>
    </div>
  );
}

export default SingleEventPage;
