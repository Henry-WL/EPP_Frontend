import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../components/hooks/useAxios";

type Props = {};

function NewEvent({}: Props) {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("2024-09-08T12:00:00");
  const [endDate, setEndDate] = useState<string>("2024-09-08T17:00:00");
  const { sendRequest } = useAxios();

  const navigate = useNavigate();

  const eventSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await sendRequest("/events", "POST", {
      name: name,
      location: location,
      description: description,
      startDate: startDate,
      endDate: endDate
    });

    console.log(response);

    navigate("/events");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          eventSubmitHandler(e);
        }}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              // required
              onChange={(e) => setName(e.target.value)}
              //   autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Location
          </label>
          <div className="mt-2">
            <input
              id="location"
              name="location"
              type="text"
              // required
              onChange={(e) => setLocation(e.target.value)}
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <input
              id="location"
              name="location"
              type="text"
              // required
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button type="submit" className="bg-green-400 p-4 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewEvent;
