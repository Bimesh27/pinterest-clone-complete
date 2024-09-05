import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const useCommentStore = create((set) => ({
   comments: [],
   loading: null,
   error: null,

   getCommentByPostId: async (postId) => {
      //here lies the error //
      // toast.success("PostId in commentByPostId: ",postId)
      set({ loading: true, error: null });
      // toast.success("comm",postId)
      try {
         const response = await axios.get(`/api/v1/comments/${postId}`);
         // toast.success("commmEnts ", response.data.comments)
         if (response.data.success) {
            set({ comments: response.data.comments });
            // toast.success(response.data.message);
         } else {
            set({ error: response.data.message });
            // toast.error(response.data.message);
         }
      } catch (error) {
         console.error("Error fetching comments:", error); // Add this line
         set({ error: "An error occurred. Please try again later" });
         // toast.error("An error occurred. Please try again later");
      } finally {
         set({ loading: false });
      }
   },

   writeComment: async (postId, text) => {
      // toast.success("PostId in writeComment: ",postId)
      set({ loading: true, error: null });
      try {
         const response = await axios.post(`/api/v1/comments/${postId}`, {
            text,
         });

         if (response.data.success) {
            toast.success(response.data.message);
         } else {
            set({ error: response.data.message });
            toast.error(response.data.message);
         }
      } catch (error) {
         console.error("Error writing comment:", error);
         set({ error: "An error occurred. Please try again later" });
      } finally {
         set({ loading: false });
      }
   },

   deleteComment: async (commentId) => {
      set({ loading: true, error: null });
      try {
         const response = await axios.delete(`/api/v1/comments/${commentId}`);

         if (response.data.success) {
            // toast.success(response.data.message);
         } else {
            set({ error: response.data.message });
            // toast.error(response.data.message);
         }
      } catch (error) {
         console.log("Error deleting comment:", error);
         set({ error: "An error occurred. Please try again later" });
      } finally {
         set({ loading: false });
      }
   },
}));

export default useCommentStore;
