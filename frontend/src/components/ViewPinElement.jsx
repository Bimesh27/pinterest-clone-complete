import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import { GiSelfLove } from "react-icons/gi";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import WriteComment from "./WriteComment";
import Comments from "./Comments";
import Filled from "../assets/Filled";
import NoFilled from "../assets/NoFilled";

import useCommentStore from "../store/commentStore";
import useUserStore from "../store/userStore";
import useAuthStore from "../store/authStore";
import usePinStore from "../store/pinStore";
import { MdDelete } from "react-icons/md";
import CircleLoading from "../assets/CircleLoading";
import ThreeDotLoading from "../assets/ThreeDotLoading";

const ViewPinElement = ({ pin, getPinById }) => {
   const navigate = useNavigate();
   const { comments, getCommentByPostId } = useCommentStore();
   const [showComment, setShowComment] = useState(true);
   const { followUser, followLoading } = useUserStore();
   const { user } = useAuthStore();
   const { likePins, deletePin, loading, deleteLoading } = usePinStore();
   console.log("comments", comments);
   console.log("pin in viewElement", pin?._id);

   useEffect(() => {
      getCommentByPostId(pin?._id);
   }, [pin]);

   const handleFollow = async () => {
      await followUser(pin?.createdBy._id);
      getPinById(pin?._id);
   };

   const handleLike = async () => {
      await likePins(pin?._id);
      getPinById(pin?._id);
   };
   // console.log("Pinid in viewPinElement", pin?._id);
   const handleDeletePost = async () => {
      await deletePin(pin?._id);
      getPinById(pin?._id);
      navigate("/");
   };

   return (
      <div className="w-full h-auto justify-center flex overflow-hidden">
         {/* Main container*/}
         <div className="flex w-fit justify-center rounded-3xl shadow-3xl m-8 max-md:m-2 max-md:flex-col max-h-[45rem] relative overflow-hidden max-md:max-h-fit">
            {/* PinsImageContainer===================== */}
            <div className="md:min-h-fit md:max-w-[25rem] items-center flex justify-center overflow-hidden">
               <img
                  src={pin?.imageUrl}
                  alt="pin"
                  className="rounded-3xl object-contain "
               />
            </div>
            {/* title and description */}
            <div className="md:w-[26rem] px-8 pt-8 relative max-md:h-fit">
               {" "}
               {/* &&&&&&& */} {/*hehehe*/}
               {/* likes div */}
               <div className="flex items-center">
                  <div className="w-full flex justify-between">
                     <div className="flex items-center gap-3">
                        {loading ? (
                           <CircleLoading color={"text-red-600"} />
                        ) : (
                           <span
                              onClick={handleLike}
                              className="transition-all"
                           >
                              {pin?.likes?.includes(user?._id) ? (
                                 <Filled />
                              ) : (
                                 <NoFilled />
                              )}
                           </span>
                        )}
                        <h1 className="font-semibold text-xl">
                           {pin?.likes?.length}
                        </h1>
                     </div>
                     {pin?.createdBy?._id === user._id && (
                        <div
                           className="text-2xl text-red-500 hover:text-red-600 cursor-pointer"
                           onClick={handleDeletePost}
                        >
                           {deleteLoading ? (
                              <CircleLoading color={"text-red-600"} />
                           ) : (
                              <MdDelete />
                           )}
                        </div>
                     )}
                  </div>
               </div>
               {/* title div */}
               <div className="pt-6 flex flex-col gap-3">
                  <h1 className="font-semibold text-3xl">{pin?.title}</h1>
                  <p>{pin?.description}</p>
               </div>
               {/* image and urername div */}
               <div className="flex pt-6 items-center justify-between">
                  <div className="flex gap-3 items-center h-20">
                     <Link
                        to={`/profile/${pin?.createdBy?._id}`}
                        className="rounded-full overflow-hidden"
                     >
                        <img
                           src={pin?.createdBy?.profilePicture}
                           alt={pin?.username}
                           className="size-14"
                        />
                     </Link>
                     <div className="flex flex-col">
                        <h1 className="font-semibold">
                           {pin?.createdBy?.username}
                        </h1>
                        <p className="mt-[-5px] text-gray-600">
                           {pin?.createdBy?.followers.length} followers
                        </p>
                     </div>
                  </div>
                  <div>
                     {pin?.createdBy?._id !== user?._id && (
                        <button
                           className={`border-2 px-4 py-2 rounded-3xl font-semibold border-black bg-black text-white hover:bg-black hover:text-white`}
                           onClick={handleFollow}
                        >
                           {followLoading ? (
                              <ThreeDotLoading />
                           ) : (
                              <p>
                                 {pin?.createdBy?.followers?.includes(user._id)
                                    ? "Unfollow"
                                    : "Follow"}
                              </p>
                           )}
                        </button>
                     )}
                  </div>
               </div>
               <div className="pt-10">
                  {comments.length > 0 ? (
                     <div className="flex flex-col justify-center">
                        <div className="flex justify-between items-center">
                           <h1 className="font-semibold">
                              {comments.length} comments
                           </h1>
                           {!showComment ? (
                              <SlArrowDown
                                 className="text-sm "
                                 onClick={() => setShowComment(true)}
                              />
                           ) : (
                              <SlArrowUp
                                 className="text-sm"
                                 onClick={() => {
                                    setShowComment(false);
                                 }}
                              />
                           )}
                        </div>
                        {showComment && (
                           <div className="overflow-y-auto h-52">
                              <Comments
                                 comments={comments}
                                 user={user}
                                 getCommentByPostId={getCommentByPostId}
                                 pinId={pin?._id}
                              />
                           </div>
                        )}
                     </div>
                  ) : (
                     <div>
                        <h1 className="font-semibold">No comments yet</h1>
                        <p className="pt-6">
                           No comments yet! Add one to start the conversation.
                        </p>
                     </div>
                  )}
               </div>
               <div className=" sticky bottom-0 h-20 bg-white flex items-center ">
                  <WriteComment postId={pin?._id} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ViewPinElement;
