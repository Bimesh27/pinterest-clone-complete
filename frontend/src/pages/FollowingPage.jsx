import { useEffect } from "react";
import Body from "../components/Body";
import NavBar from "../components/NavBar";
import useAuthStore from "../store/authStore";
import usePinStore from "../store/pinStore";
import { Link } from "react-router-dom";
import NavBarForSmallerScreen from "../components/NavBarForSmallerScreen";
import FullPageLoading from "../assets/FullPageLoading";

const FollowingPage = () => {
   const { user } = useAuthStore();

   const { followingPins, getFollowingPins, loading } = usePinStore();
   // console.log('pins in following', pins);

   useEffect(() => {
      getFollowingPins();
   }, [getFollowingPins]);

   return (
      <div className="relative h-full w-full overflow-hidden">
         <div className="h-20 max-sm:hidden">
            <NavBar />
         </div>
         <div className="bg-white h-12 w-full z-50 bottom-0 fixed flex items-center sm:hidden">
            <NavBarForSmallerScreen />
         </div>
         {loading ? (
            <FullPageLoading />
         ) : (
            <div className="w-full h-full">
               {followingPins.length > 0 ? (
                  <div className="w-full h-full">
                     <h1 className="text-center font-semibold underline pt-2">
                        Users you follow
                     </h1>
                     <div className="h-28 bg-white w-full">
                        <div className="flex gap-4 p-4 justify-start items-center overflow-x-auto">
                           {user?.following.map((u) => (
                              <Link
                                 to={`/profile/${u._id}`}
                                 key={u._id}
                                 className="flex flex-col text-center items-center justify-center w-20"
                              >
                                 <div className="w-full flex justify-center gap-2 items-start">
                                    <img
                                       src={u?.profilePicture}
                                       alt={u?.username}
                                       className="max-w-20 max-h-20 object-cover rounded-full"
                                    />
                                 </div>
                                 <h1 className="text-center text-sm font-semibold">
                                    {u?.username}
                                 </h1>
                              </Link>
                           ))}
                        </div>
                     </div>

                     <div className="sm:pt-10 max-sm:p-5">
                        <Body pins={followingPins} />
                     </div>
                  </div>
               ) : (
                  <div className="flex justify-center items-center h-96 flex-col gap-4">
                     <h1 className="text-2xl">No pins to show</h1>
                     <Link
                        to={"/"}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-5 rounded-3xl"
                     >
                        Back to Home
                     </Link>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default FollowingPage;
