import React, { useContext } from "react";
import authContext from "../context/auth-context";
import CardComponent from "../components/cardComponent";
import { useNavigate } from "react-router-dom";

type Props = {};

function Index({}: Props) {
  const auth = useContext(authContext);

  const navigate = useNavigate()
  return (
    <div>
      <div className="flex justify-around">
        <div className="flex gap-4">
          <button className="btn md:btn-md lg:btn-lg" onClick={() => navigate('/profile')}>
            My events
          </button>
          <button className="btn md:btn-md lg:btn-lg">
            Free events
          </button>
        </div>

        <div>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Filter
            </option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 justify-center">
        <div></div>

        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  );
}

export default Index;
