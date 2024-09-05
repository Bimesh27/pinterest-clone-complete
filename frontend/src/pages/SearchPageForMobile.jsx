import { useEffect, useState } from "react";
import Body from "../components/Body";
import NavBarForSmallerScreen from "../components/NavBarForSmallerScreen";
import usePinStore from "../store/pinStore";
import { FiSearch } from "react-icons/fi";

const SearchPageForMobile = () => {
    const { searchPin, searchedPins, getAllPins } = usePinStore();
    // let {pins} = usePinStore();

    const [query, setQuery] = useState("");

    // useEffect(() => {
    //     getAllPins();
    // },[])

    const handleDownKey = async (e) => {
        if (e.key === "Enter") {
            await searchPin(query);
            console.log("-------------", searchedPins);
        }
    };
    return (
        <div className="h-screen w-full relative">
            <div className="bg-white h-12 w-full z-50 bottom-0 fixed flex items-center sm:hidden">
                <NavBarForSmallerScreen />
            </div>
            <div>
                <div className="h-20 bg-white-500 w-full flex justify-center items-center">
                    <div className="relative w-[80%] flex items-center justify-center">
                        <input
                            type="text"
                            className=" w-full pl-10 outline outline-gray-400 py-2 rounded-3xl"
                            placeholder="Search Pins here"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleDownKey}
                        />
                        <div className="absolute left-4">
                            <FiSearch />
                        </div>
                    </div>
                </div>
            </div>
            <Body pins={searchedPins} />
        </div>
    );
};

export default SearchPageForMobile;
