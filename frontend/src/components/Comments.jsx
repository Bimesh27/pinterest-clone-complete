import { Link } from "react-router-dom";
import useCommentStore from "../store/commentStore";
import { MdDelete } from "react-icons/md";
import CircleLoading from "../assets/CircleLoading";

const Comments = ({ comments, user, getCommentByPostId, pinId }) => {
   console.log("PinId in Comments", pinId);

   const { deleteComment, loading } = useCommentStore();

   const handleDeleteComment = async (commentId) => {
      await deleteComment(commentId);
      await getCommentByPostId(pinId);
   };

   return (
      <div className="flex flex-col gap-4 pt-4 text-wrap h-[40%] ">
         {comments.map((comment) => (
            <div key={comment._id} className="flex pt-3 ">
               <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                     <Link to={`/profile/${comment.postedBy._id}`}>
                        <img
                           src={comment?.postedBy?.profilePicture}
                           alt={comment?.postedBy.username}
                           className="size-12 rounded-full"
                        />
                     </Link>
                     <div className="flex flex-col">
                        <h1 className="font-semibold hover:underline">
                           {comment?.postedBy?.username}
                        </h1>
                        <p className="text-gray-600">{comment?.text}</p>
                     </div>
                  </div>
                  <div className="pr-6">
                     {comment.postedBy._id === user._id && (
                        <div>
                           {loading ? (
                              <CircleLoading color={"text-red-600"} />
                           ) : (
                              <MdDelete
                                 className="text-xl text-red-500 cursor-pointer"
                                 onClick={() => {
                                    handleDeleteComment(comment._id);
                                 }}
                              />
                           )}
                        </div>
                     )}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Comments;
