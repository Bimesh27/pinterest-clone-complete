// import { useEffect } from "react";
// import usePinStore from "../store/pinStore";
import BodyElement from "./BodyElement";

const Body = ({ pins }) => {
   console.log("pins in Body: ", pins);

   return (
      <div className="h-full w-full">
         <BodyElement pins={pins} />
      </div>
   );
};

export default Body;
