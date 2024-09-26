import React from "react";
import { PiCalendarCheck } from "react-icons/pi";

interface Event {
  _id: string;
  name: string;
  location: string;
  description: string;
  startDate: string; // Use ISO 8601 format (e.g., '2024-09-10T14:00:00')
  endDate: string; // Use ISO 8601 format (e.g., '2024-09-10T16:00:00')
}

interface Props {
  event: Event;
}

const formatGoogleCalendarDate = (date: string) => {
  // Converts date from '2024-09-10T14:00:00' to '20240910T140000Z'
  return new Date(date).toISOString().replace(/-|:|\.\d+/g, "");
};

const AddToGoogleCalendarButton: React.FC<Props> = ({ event }) => {
  const { name, location, description, startDate, endDate } = event;

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    name
  )}&dates=${formatGoogleCalendarDate(startDate)}/${formatGoogleCalendarDate(
    endDate
  )}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
    location
  )}`;

  return (
    <a
    href={googleCalendarUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="btn bg-white border border-gray-300 shadow-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white p-2 transition duration-300 ease-in-out flex items-center justify-center"
  >
    <PiCalendarCheck size={20} />
    Add to Google Calendar
  </a>
  );
};

export default AddToGoogleCalendarButton;
