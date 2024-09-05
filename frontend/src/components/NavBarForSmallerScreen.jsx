import { GoHomeFill } from "react-icons/go";
import { FaPlus, FaSearch } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { GoChevronUp } from "react-icons/go";
import ProfileDropdown from "./ProfileDropdown";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import useUserStore from "../store/userStore";
import DeleteAccountPopup from "./DeleteAccountPopup";

const NavBarForSmallerScreen = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // const dropdownRef = useRef(null);

    const { deleteUser } = useUserStore();
    const { user, getMe } = useAuthStore();

    return (
        <nav className="h-10 w-full sm:hidden flex items-center justify-center z-50 bg-white">
            <ul className="flex items-center justify-evenly w-full ml-8">
                <Link to={"/"}>
                    <GoHomeFill
                        className={`text-3xl ${
                            currentPath === "/" ? "text-red-500" : ""
                        }`}
                    />
                </Link>
                <Link to={"/search-mobile"}>
                    <FaSearch
                        className={`text-2xl ${
                            currentPath === "/search-mobile" ? "text-red-500" : ""
                        }`}
                    />
                </Link>
                <Link to={"/following"}>
                    <MdOutlineExplore
                        className={`text-3xl ${
                            currentPath === "/following" ? "text-red-500" : ""
                        }`}
                    />
                </Link>
                <Link to={"/create"}>
                    <FaPlus
                        className={`text-2xl ${
                            currentPath === "/create" ? "text-red-500" : ""
                        }`}
                    />
                </Link>
                <li>
                    <div className="flex items-center gap-2">
                        <Link to={`/profile/${user._id}`}>
                            <img
                                src={user?.profilePicture}
                                alt={user?.username}
                                className="size-8 rounded-full object-cover object-center"
                            />
                        </Link>
                        <div className="bg-gray-200 rounded-full p-1">
                            <GoChevronUp
                                onClick={() => setShowDropdown((prev) => !prev)}
                            />
                        </div>
                    </div>
                </li>
            </ul>

            {showDropdown && (
                <div className="absolute bottom-11 right-14 max-w-72 overflow-hidden rounded-xl">
                    <ProfileDropdown
                        setShowDeletePopup={setShowDeletePopup}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            )}

            {showDeletePopup && (
                <div className="fixed inset-0 z-50 bg-white shadow-3xl flex justify-center items-center custom-glass-two">
                    <DeleteAccountPopup
                        setShowDeletePopup={setShowDeletePopup}
                        deleteUser={deleteUser}
                        getMe={getMe}
                        user={user}
                    />
                </div>
            )}
        </nav>
    );
};

export default NavBarForSmallerScreen;
