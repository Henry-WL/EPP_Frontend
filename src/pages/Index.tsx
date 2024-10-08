import { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import { useNavigate } from "react-router-dom";
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
  tags: string[];
  endDate: string;
  filmData: object
}

function Index({}: Props) {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [sortOption, setSortOption] = useState<string>("newest");

  const { sendRequest, isLoading } = useAxios();
  ("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(`/events?sort=${sortOption}`);
        console.log(responseData);
        setEvents(responseData.data.allEvents);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, [sortOption]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex justify-around">
        <div className="flex gap-4">
          <button
            className="btn md:btn-md lg:btn-lg"
            onClick={() => navigate("/myevents")}
          >
            My events
          </button>
          {/* <button className="btn md:btn-md lg:btn-lg">Free events</button> */}
        </div>

        <div>
          <select
            className="select select-bordered w-full max-w-xs"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option disabled selected>
              Filter
            </option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <div></div>

        {events.slice(0, 3).map((event) => {
          return (
            <CardComponent
              key={event._id}
              eventName={event.name}
              eventLocation={event.location}
              eventDescription={event.description}
              startDate={event.startDate}
              tags={event.tags}
              filmData={event.filmData}
              id={event._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Index;
