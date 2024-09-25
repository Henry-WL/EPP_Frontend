import React, { useContext, useEffect, useState } from "react";
import authContext, { AuthContextType } from "../context/auth-context";
import { useAxios } from "../components/hooks/useAxios";
import LoadingSpinner from "../components/LoadingSpinner";
import CardComponent from "../components/cardComponent";

type Props = {};

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

function MyEvents({}: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const auth = useContext(authContext) as AuthContextType | null;
  const { response, error, isLoading, sendRequest } = useAxios();

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const responseData = await sendRequest(
          `/events/userEvents/${auth?.userId}`
        );
        console.log(responseData);
        setEvents(responseData.data.foundUserEvents);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserEvents();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
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

  return (
    <div className="m-2">
      <div className="flex flex-wrap gap-4 justify-center">
        {events.map((event) => {
          const compareDate = event.startDate;
          return (
            <div
              key={event._id}
              className={` ${
                checkEventPastDate(event.startDate) ? "opacity-50" : ""
              }
            
          `}
            >
              {/* <h1
                className={
                  checkEventPastDate(event.startDate) ? "line-through" : ""
                }
              >
                {event.name}
              </h1> */}
              <CardComponent
                key={event._id}
                eventName={event.name}
                eventLocation={event.location}
                eventDescription={event.description}
                tags={event.tags}
                id={event._id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyEvents;
