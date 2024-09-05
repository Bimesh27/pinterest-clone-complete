import React from "react";
import Body from "../components/Body";
import NavBarForSmallerScreen from "../components/NavBarForSmallerScreen";
import NavBar from "../components/NavBar";
import usePinStore from "../store/pinStore";
import FullPageLoading from "../assets/FullPageLoading";



const SearchPinPage = () => {
    const {searchedPins, loading} = usePinStore();

    return (
        <div className="h-screen w-full relative">
            <div className="h-20 max-sm:h-0">
                <NavBar />
            </div>
            <div className="bg-white h-12 w-full z-50 bottom-0 fixed flex items-center sm:hidden">
                <NavBarForSmallerScreen />
            </div>
            {loading? <FullPageLoading/> :<Body pins={searchedPins} />}
        </div>
    );
};

export default SearchPinPage;
