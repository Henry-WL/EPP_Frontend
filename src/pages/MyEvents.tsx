import React, { useContext, useEffect, useState } from "react";
import authContext, { AuthContextType } from "../context/auth-context";
import { useAxios } from "../components/hooks/useAxios";
import LoadingSpinner from "../components/LoadingSpinner";

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
    return <LoadingSpinner/>
  }

  const checkEventPastDate = (startDate) => {
    let currentDate = new Date()
    let eventStartDate = new Date(startDate)

    if (currentDate > eventStartDate) {
        return true
    } else {
        return false
    }

  }

  return (
    <div>
      MyEvents
      {events.map((event) => {
        const compareDate = event.startDate
        return <h1 key={event._id} className={checkEventPastDate(event.startDate) ? 'line-through' : ''}>{event.name}</h1>
      })}
    </div>
  );
}

export default MyEvents;
