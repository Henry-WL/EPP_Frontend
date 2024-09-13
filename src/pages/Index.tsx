import React, { useContext } from "react";
import authContext from "../context/auth-context";
import CardComponent from "../components/cardComponent";

type Props = {};

function Index({}: Props) {
  const auth = useContext(authContext);
  return (
    <div className="mt-2 flex flex-wrap gap-2 justify-center">

    {/* <CardComponent/>
    <CardComponent/>
    <CardComponent/>
    <CardComponent/> */}
      
    </div>
  );
}

export default Index;
