import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { useAxios } from "../components/hooks/useAxios";

type Props = {};

function Events({}: Props) {
  const [events, setEvents] = useState([]);

  const { sendRequest, response, isLoading, error } = useAxios();''

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest("/events");
        console.log(responseData);
        setEvents(responseData.data.allEvents);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {/* <h1>Events</h1> */}

      {isLoading && (
        <div>
          <h1 className="text-3xl">Loading....</h1>
        </div>
      )}

      {!isLoading && (
        <div className="flex gap-4 flex-wrap justify-center">
          {events.map((event) => {
            return (
              <EventCard
                eventName={event.name}
                eventLocation={event.location}
                eventDescription={event.description}
                id={event._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Events;
