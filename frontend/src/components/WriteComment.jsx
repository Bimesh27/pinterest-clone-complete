import { useState } from "react";
import useAuthStore from "../store/authStore";
import { IoSend } from "react-icons/io5";
import useCommentStore from "../store/commentStore";
import { Link } from "react-router-dom";
import CircleLoading from "../assets/CircleLoading";

const WriteComment = ({ postId }) => {
    const { user } = useAuthStore();
    const [content, setContent] = useState("");
    const { writeComment, loading } = useCommentStore();
    const { getCommentByPostId } = useCommentStore();

    const handleComment = async () => {
        await writeComment(postId, content);
        await getCommentByPostId(postId);
        setContent("");
    };

    return (
        <div className="w-full flex items-center gap-4 relative ">
            <Link to={`/profile/${user._id}`}>
                <img
                    src={user?.profilePicture}
                    alt={user.username}
                    className="size-10 rounded-full"
                />
            </Link>
            <textarea
                type="text"
                placeholder="Add a comment "
                className="py-2 border px-4 rounded-3xl w-[80%] focus:outline-none text-wrap resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            {content.length !== 0 && (
                <div className="absolute right-6 rounded-full flex items-center justify-center transition-all duration-1000">
                    {loading ? (
                        <CircleLoading color={"text-blue-600"}/>
                    ) : (
                        <div className="bg-blue-600 p-2 rounded-full">
                            <IoSend
                                className="text-white text-lg cursor-pointer"
                                onClick={handleComment} 
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WriteComment;
