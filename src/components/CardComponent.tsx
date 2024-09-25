import { useNavigate } from "react-router-dom";

type Props = {
  eventName: string;
  eventLocation: string;
  eventDescription: string;
  tags: string[]
  id: string;
};

const CardComponent = ({
  eventName,
  eventLocation,
  eventDescription,
  tags,
  id,
}: Props) => {
  const navigate = useNavigate();
  console.log(tags, 'tags')
  return (
    <div onClick={() => navigate(`/event/${id}`)} className="cursor-pointer">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body min-h-52">
          <h2 className="card-title">
            {eventName}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{eventDescription ? eventDescription.slice(0,75) : '...'}...</p>
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
