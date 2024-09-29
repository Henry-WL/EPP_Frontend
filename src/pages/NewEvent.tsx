import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../components/hooks/useAxios";
import DateTimePicker from "../components/DateTimePicker";

type Props = {};

function NewEvent({}: Props) {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [payWant, setPayWant] = useState<boolean>(false)
  const [ticketPrice, setTicketPrice] = useState<string>("0");
  const [tags, setTags] = useState<string>("");
  // const [startDate, setStartDate] = useState<string>("2024-09-08T12:00:00");
  const [startDate, setStartDate] = useState<string>("");
  // const [startTime, setStartTime] = useState<string>("T17:00:00");
  // const [endDate, setEndDate] = useState<string>("2024-09-08T17:00:00");
  const [endDate, setEndDate] = useState<string>("");
  const { sendRequest } = useAxios();

  const navigate = useNavigate();

  const eventSubmitHandler = async (e) => {
    e.preventDefault();

    // Log start and end dates for debugging
    console.log(startDate, "startDate");
    console.log(endDate, "endDate");

    // Split tags string into array, trimming any extra spaces
    const tagsArr = tags.split(",").map((tag) => tag.trim());
    console.log(tagsArr);


    console.log(payWant, 'pay wantttttt')

    // Send event data to the server
    const response = await sendRequest("/events", "POST", {
      name: name,
      location: location,
      description: description,
      startDate: startDate,
      endDate: endDate,
      payWant: payWant,
      ticketPrice: ticketPrice,
      tagsArr: tagsArr,
    });

    console.log(response);

    // Navigate to events page after submission
    navigate("/events");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Create New Event</h2>
      <form onSubmit={eventSubmitHandler}>
        {/* Event Name */}
        <div className="form-control mb-4">
          <label htmlFor="name" className="label">
            <span className="label-text">Event Name</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter event name"
            // required
          />
        </div>

        {/* Location */}
        <div className="form-control mb-4">
          <label htmlFor="location" className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter event location"
            autoComplete="email"
            // required
          />
        </div>

        {/* Start Date */}
        <div className="form-control mb-4">
          <label htmlFor="datestart" className="label">
            <span className="label-text">Start Date & Time</span>
          </label>
          <input
            id="datestart"
            name="datestart"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input input-bordered w-full"
            // required
          />
        </div>

        {/* End Date */}
        <div className="form-control mb-4">
          <label htmlFor="dateend" className="label">
            <span className="label-text">End Date & Time</span>
          </label>
          <input
            id="dateend"
            name="dateend"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input input-bordered w-full"
            autoComplete="email"
            // required
          />
        </div>

        {/* Description */}
        <div className="form-control mb-4">
          <label htmlFor="description" className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Enter event description"
            // required
          ></textarea>
        </div>

        {/* Pay what you want? */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Pay what you want</span>
            <input type="checkbox" defaultChecked={payWant} className="checkbox" onChange={() => setPayWant(!payWant)} />
          </label>
        </div>

        {/* Ticket Price */}
        <div className="form-control mb-4">
          <label htmlFor="ticketprice" className="label">
            <span className="label-text">Ticket Price (0 for free event)</span>
          </label>
          <input
            id="ticketprice"
            name="ticketprice"
            type="number"
            disabled={payWant}
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter ticket price"
            autoComplete="email"
            // required
          />
        </div>

        {/* Tags */}
        <div className="form-control mb-4">
          <label htmlFor="tags" className="label">
            <span className="label-text">Tags (separate by comma)</span>
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter tags"
            // required
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-success w-full">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewEvent;
