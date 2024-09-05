import { useEffect, useRef, useState } from "react";
import { FaPinterest, FaSearch } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { useLocation, useNavigate } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";
import ProfileDropdown from "./ProfileDropdown";
import { Link } from "react-router-dom";
import DeleteAccountPopup from "./DeleteAccountPopup";
import useUserStore from "../store/userStore";
import usePinStore from "../store/pinStore";

const NavBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const location = useLocation();

    const currentPath = location.pathname;

    const [focus, setFocus] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const dropdownRef = useRef(null);

    const { user, getMe } = useAuthStore();
    const { deleteUser } = useUserStore();
    const { searchPin } = usePinStore();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchPin(query);
            navigate("/search/pins");
        }
    };

    console.log("showDropdownBeforeClick :", showDropdown);

    // Ill Add dropdown close when clicking outside functionality Later==============

    return (
        <nav className=" w-full h-20 flex justify-center max-sm:hidden fixed z-50 bg-white">
            <div className="w-full flex items-center px-8 justify-between relative">
                {/* ================Logo And List Div==================== */}
                <div className="flex gap-4 items-center max-sm:gap-0">
                    <Link
                        to={"/"}
                        className="hover:bg-gray-300 p-2 rounded-full transition-all"
                    >
                        <FaPinterest className="text-blue-600 text-2xl cursor-pointer" />
                    </Link>
                    <ul className="flex gap-4 px-2 cursor-pointer font-semibold text-base max-sm:text-sm items-center">
                        <Link
                            to={"/"}
                            className={`${
                                currentPath === "/"
                                    ? "bg-black text-white py-3 rounded-3xl px-4"
                                    : ""
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            to={"/following"}
                            className={`${
                                currentPath === "/following"
                                    ? "bg-black text-white py-3 rounded-3xl px-4"
                                    : ""
                            }`}
                        >
                            Following
                        </Link>
                        <Link
                            to={"/create"}
                            className={`${
                                currentPath === "/create"
                                    ? "bg-black text-white py-3 rounded-3xl px-4"
                                    : ""
                            }`}
                        >
                            Create
                        </Link>
                    </ul>
                </div>
                {/* ================Search div============================= */}
                <div className="relative max-sm:mr-2">
                    <input
                        type="text"
                        value={query}
                        className={`xl:w-[52rem] lg:w-[35rem] md:w-[20rem] sm:w-[12rem] max-sm:w-[8rem] py-3 max-sm:py-2 rounded-full bg-gray-100 focus:outline focus:outline-blue-300 focus:outline-4 ${
                            focus ? "pl-6" : "pl-12"
                        }`}
                        placeholder="Search"
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <FaSearch
                        className={` top-[1.03rem] left-5 text-gray-500 max-sm:top-3 ${
                            focus ? "hidden" : "block"
                        } absolute `}
                    />
                </div>
                {/* ================User Logo div============================= */}
                {user && (
                    <div>
                        <div className="flex items-center gap-3 ">
                            <Link
                                to={`/profile/${user?._id}`}
                                className="p-2 hover:bg-gray-300 transition-all rounded-full"
                            >
                                <img
                                    src={user?.profilePicture}
                                    alt={user?.username}
                                    className="rounded-full h-8 w-8 object-cover object-center"
                                />
                            </Link>
                            <div
                                className="rounded-full p-1 cursor-pointer hover:bg-gray-300 transition-all"
                                onClick={() => {
                                    setShowDropdown((prev) => !prev);
                                    console.log(
                                        "ShowDropdown after click :",
                                        showDropdown
                                    );
                                }}
                            >
                                <SlArrowDown />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {showDeletePopup && (
                <div className="absolute z-50 bg-white shadow-3xl w-full h-screen flex justify-center items-center custom-glass-two">
                    <DeleteAccountPopup
                        setShowDeletePopup={setShowDeletePopup}
                        deleteUser={deleteUser}
                        getMe={getMe}
                        user={user}
                    />
                </div>
            )}
            {showDropdown && (
                <div
                    ref={dropdownRef}
                    className={`absolute z-50 transition-all right-6 top-14 max-w-fit max-h-fit shadow-2xl rounded-lg overflow-hidden ${
                        showDropdown ? "block" : "hidden"
                    }`}
                >
                    <ProfileDropdown
                        setShowDeletePopup={setShowDeletePopup}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            )}
        </nav>
    );
};

export default NavBar;
