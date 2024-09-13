import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  eventName: string;
  eventLocation: string;
  eventDescription: string;
  id: string;
};

const CardComponent = ({
  eventName,
  eventLocation,
  eventDescription,
  id,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/event/${id}`)} className="cursor-pointer">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {eventName}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{eventDescription}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{eventLocation}</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
