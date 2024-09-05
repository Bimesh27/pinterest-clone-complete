import useAuthStore from "../store/authStore";
import { SiVerizon } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const ProfileDropdown = ({setShowDeletePopup, setShowDropdown}) => {
    const navigate = useNavigate();

    const { user, logout } = useAuthStore();
    console.log("User:", user);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="w-72 rounded-xl shadow-lg flex flex-col gap-3 p-3 bg-white transition-all">
            <h5 className="text-gray-500 text-sm">Currently in</h5>
            <Link
                to={`/profile/${user._id}`}
                className="bg-gray-100 flex items-center rounded-md px-2 justify-between py-1"
            >
                <div>
                    <img
                        src={user?.profilePicture}
                        alt={user?.username}
                        className="size-16 rounded-full object-cover object-center"
                    />
                </div>
                <div>
                    <h2 className="font-bold">{user?.username}</h2>
                    <p className="text-gray-500">Personal</p>
                    <p className="text-gray-500">{user?.email}</p>
                </div>
                <div>
                    <SiVerizon className="text-green-500" />
                </div>
            </Link>
            <h1 className="pb-1 text-sm text-gray-500">Your accounts</h1>
            <Link to={`/update/${user._id}`} className="flex items-center font-bold pb-5 justify-between cursor-pointer hover:scale-95 transition-all">
                <h1>Update Profile</h1>
                <FaEdit className="text-blue-500" />
            </Link>
            <h1 className="text-sm text-gray-500">More options</h1>
            <div className="font-bold flex flex-col gap-4 cursor-pointer">
                <div
                    className="flex items-center justify-between hover:scale-95 transition-all"
                    onClick={() => {
                        setShowDeletePopup((prev) => !prev);
                        setShowDropdown((prev) => !prev);
                    }}
                >
                    <h1>Delete account</h1>
                    <MdDelete className="text-red-500 text-xl" />
                </div>
                <div
                    className="flex items-center justify-between hover:scale-95 transition-all"
                    onClick={handleLogout}
                >
                    <h1>Log out</h1>
                    <IoIosLogOut />
                </div>
            </div>
        </div>
    );
};

export default ProfileDropdown;
