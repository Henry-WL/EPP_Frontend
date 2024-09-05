import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = {};

function SingleEventPage({}: Props) {
    const [event, setEvent] = useState()
    const [loading, setLoading] = useState(true)
  const { eventId } = useParams();

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

  return (
    <div>

        {loading && <p>Loading...</p>}

      <h1>{eventId}</h1>

      <div>
        <img src="https://flowbite-react.com/images/blog/image-1.jpg" alt="" />

      </div>

        {!loading && <p>{event.location}</p>}
    </div>
  );
}

export default SingleEventPage;
