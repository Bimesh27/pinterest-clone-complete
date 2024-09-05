import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import usePinStore from "../store/pinStore";
import ViewPinElement from "../components/ViewPinElement";
import { useEffect } from "react";
import NavBarForSmallerScreen from "../components/NavBarForSmallerScreen";
import FullPageLoading from "../assets/FullPageLoading";

const ViewPage = () => {
   const { postId } = useParams();
   const { specificPin, getPinById, loading } = usePinStore();

   console.log("Id in viewPage", postId);
   console.log("Specific Pin", specificPin);

   useEffect(() => {
      getPinById(postId);
   }, [postId, getPinById]);

   return (
      <div className="h-full w-full relative">
         <div className="h-20 max-sm:h-0">
            <NavBar />
         </div>
         <div className="bg-white h-12 w-full z-50 bottom-0 fixed flex items-center sm:hidden sm:h-0">
            <NavBarForSmallerScreen />
         </div>
         <div className="h-fit w-full pb-12">
            <ViewPinElement pin={specificPin} getPinById={getPinById} />
         </div>
      </div>
   );
};

export default ViewPage;
