import React from "react";

interface Event {
  id: string;
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
      className="btn btn-primary bg-red-400 p-2"
    >
      Add to Google Calendar
    </a>
  );
};

export default AddToGoogleCalendarButton;
