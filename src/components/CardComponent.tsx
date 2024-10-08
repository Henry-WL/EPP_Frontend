import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react"
import { format, parseISO } from "date-fns";

type filmData = {
  Poster?:string
}

type Props = {
  eventName: string;
  eventLocation: string;
  eventDescription: string;
  startDate: string;
  tags: string[]
  id: string;
  filmData: filmData
};

const CardComponent = ({
  eventName,
  eventLocation,
  eventDescription,
  startDate,
  tags,
  id,
  filmData
}: Props) => {
  const navigate = useNavigate();

  const originalStartDateString = startDate;
  const parsedStartDate = parseISO(originalStartDateString);
  const formattedStartDate = format(parsedStartDate, "do MMMM");

  return (
    <div onClick={() => navigate(`/event/${id}`)} className="cursor-pointer">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src={filmData.Poster || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
            alt="Shoes"
          />
        </figure>
        <div className="card-body min-h-52">
          <h2 className="card-title">
            {eventName}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{eventDescription ? eventDescription.slice(0,75) : '...'}...</p>
          

          <div className="">
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <CalendarDays className="h-4 w-4 mr-1" />
                            <span>{formattedStartDate}</span>
                            <MapPin className="h-4 w-4 ml-4 mr-1" />
                            <span>{eventLocation}</span>
                          </div>
               
                        </div>

                        <div className="card-actions justify-end">

            {tags.slice(0,4).map((tag) => {
                return (<div className="badge badge-outline">{tag}</div>)
            })}
            {/* <div className="badge badge-outline">{eventLocation}</div>
            <div className="badge badge-outline">Products</div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
