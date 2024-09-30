import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  eventName: string;
  eventLocation: string;
  eventDescription: string;
  id: string;
};

function EventCard({ eventName, eventLocation, eventDescription, id }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="max-w-sm border-2 border-black"
      onClick={() => navigate(`/event/${id}`)}
    >
      <img src="https://flowbite-react.com/images/blog/image-1.jpg" alt="" />
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
        {eventName}
      </h5>
      <h2>{eventLocation}</h2>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {eventDescription}
      </p>
    </div>
  );
}

export default EventCard;
