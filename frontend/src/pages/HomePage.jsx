import { useEffect } from "react";
import Body from "../components/Body";
import NavBar from "../components/NavBar";
import NavBarForSmallerScreen from "../components/NavBarForSmallerScreen";
import usePinStore from "../store/pinStore";
import FullPageLoading from "../assets/FullPageLoading";

const HomePage = () => {
   const { pins, getAllPins, loading } = usePinStore();
   // const { getAllPins } = usePinStore();

   useEffect(() => {
      getAllPins();
   }, []);

   return (
      <div className="h-full w-full relative">
         <div className="h-20 max-sm:h-0">
            <NavBar />
         </div>
         <div className="bg-white h-12 w-full z-50 bottom-0 fixed flex items-center sm:hidden">
            <NavBarForSmallerScreen />
         </div>
         {loading ? <FullPageLoading /> : <Body pins={pins} />}
      </div>
   );
};
export default HomePage;
