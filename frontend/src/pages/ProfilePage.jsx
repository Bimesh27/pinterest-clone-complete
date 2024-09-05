import { FaPinterest } from "react-icons/fa";
import NavBar from "../components/NavBar";
import useAuthStore from "../store/authStore";
import Body from "../components/Body";
import useUserStore from "../store/userStore";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavBarForSmallerScreen from "../components/NavBarForSmallerScreen";
import FullPageLoading from "../assets/FullPageLoading";
import ThreeDotLoading from "../assets/ThreeDotLoading";

const ProfilePage = () => {
    const { getUserProfile, profile, followUser, loading, followLoading } = useUserStore();
    const { id } = useParams();
    const { user } = useAuthStore();

    const isYourProfile = user?._id === id;

    useEffect(() => {
        getUserProfile(id);
    }, [id]);

    const handleFollow = async () => {
        await followUser(id);
        await getUserProfile(id); // Re-fetch the user's profile after following/unfollowing======
    };

    return (
        <div className="w-full relative h-screen">
            <div className="h-20 max-sm:hidden">
                <NavBar />
            </div>
            <div className="fixed bottom-0 w-full z-50 bg-white">
                <NavBarForSmallerScreen />
            </div>
            {loading ? (
                <FullPageLoading />
            ) : (
                <div>
                    <div className="flex flex-col justify-center items-center pt-4">
                        {/* User Profile */}
                        <div>
                            <img
                                src={profile?.profilePicture}
                                alt={profile?.username}
                                className="size-32 rounded-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center pt-4 gap-2 h-fit">
                            <h1 className="font-semibold text-4xl">
                                {profile?.username}
                            </h1>
                            <div className="flex items-center gap-2">
                                <FaPinterest className="opacity-40" />
                                <p className="text-gray-500">
                                    {profile?.email}
                                </p>
                            </div>
                            <div className="flex gap-2 items-center font-semibold">
                                <p className="text-md">{`${profile?.following?.length} following`}</p>
                                {"."}
                                <p className="text-md">{`${profile?.followers?.length} followers`}</p>
                            </div>
                            <div>
                                <p className="text-gray-700">{profile?.bio}</p>
                            </div>
                        </div>
                        {isYourProfile ? (
                            <Link
                                to={`/update/${profile?._id}`}
                                className="mt-6"
                            >
                                <button className="font-semibold bg-gray-200 px-6 py-3 rounded-3xl hover:bg-gray-300 transition-all">
                                    Update Profile
                                </button>
                            </Link>
                        ) : (
                            <div className="mt-6">
                                <button
                                    className="font-semibold bg-blue-500 px-6 py-3 rounded-3xl hover:bg-blue-600 transition-all text-white"
                                    onClick={handleFollow}
                                >
                                    {followLoading ? <ThreeDotLoading/>:  <p>
                                        {profile?.followers?.includes(user?._id)
                                            ? "Unfollow"
                                            : "Follow"}
                                    </p>}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="pt-8 flex justify-center font-medium flex-col items-center gap-6 max-h-fit">
                        <h1 className="underline text-[17px]">Created</h1>
                        <div>
                            {profile?.pins?.length ? (
                                <Body pins={profile?.pins} />
                            ) : (
                                <h1>
                                    Nothing to show...yet! Pins you create will
                                    live here
                                </h1>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
