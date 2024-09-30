import { useEffect, useState } from "react";
import { useAxios } from "../components/hooks/useAxios";
import CardComponent from "../components/cardComponent";
import LoadingSpinner from "../components/LoadingSpinner";

interface Attendee {
    userId: string;
    username: string;
}

interface Event {
  _id: string;
  name: string;
  attendees: Attendee[],
  location: string;
  description: string;
  startDate: string;
  tags: string[];
  endDate: string;
}

type Props = {};

function Events({}: Props) {
  const [events, setEvents] = useState<Event[]>([]);

  const { sendRequest, response, isLoading, error } = useAxios();
  ("");

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
            <LoadingSpinner />
        </div>
      )}

      {!isLoading && (
        <div className="flex gap-4 flex-wrap justify-center">
          {events.map((event) => {
            return (
              <CardComponent
                key={event._id}
                eventName={event.name}
                eventLocation={event.location}
                eventDescription={event.description}
                tags={event.tags}
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
