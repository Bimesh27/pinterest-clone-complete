import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import NavBarForSmallerScreen from "../components/NavBarForSmallerScreen";
import UpdateProfileComponents from "../components/UpdateProfileComponents";
import useUserStore from "../store/userStore";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import ThreeDotLoading from "../assets/ThreeDotLoading";

const UpdateProfilePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getUserProfile, profile, updateUser, loading } = useUserStore();
    const {getMe} = useAuthStore();

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    const credentials = {
        username,
        bio,
        profilePicture,
    };

    useEffect(() => {
        getUserProfile(id);
    }, [id]);

    const handleUpdate = async () => {
        await updateUser(id, credentials);
        await getUserProfile(id);
        await getMe();
        navigate("/");
    };

    return (
        <div className="h-screen w-full relative">
            <div className="h-20 max-sm:h-0">
                <NavBar />
            </div>
            <div className="bg-white h-12 w-full z-50 bottom-0 fixed flex items-center sm:hidden">
                <NavBarForSmallerScreen />
            </div>
            <div className="w-full justify-between items-center flex px-10 py-2">
                <h1 className="font-semibold text-2xl max-sm:text-lg">Update profile</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-600 py-3 px-6 rounded-full font-semibold text-white max-sm:px-4 max-sm:py-2"
                    onClick={handleUpdate}
                >
                    {loading? <ThreeDotLoading/> : "Update"}
                </button>
            </div>
            <div className="mt-10">
                <UpdateProfileComponents
                    profile={profile}
                    getUserProfile={getUserProfile}
                    id={id}
                    setUsername={setUsername}
                    setBio={setBio}
                    setProfilePicture={setProfilePicture}
                    profilePicture={profilePicture}
                />
            </div>
        </div>
    );
};

export default UpdateProfilePage;
