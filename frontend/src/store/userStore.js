import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const useUserStore = create((set) => ({
   profile: null,
   loading: null,
   error: null,
   followLoading: null,

   getUserProfile: async (id) => {
      // console.log("id: ", id);

      set({ loading: true, error: null });
      try {
         const response = await axios.get(`/api/v1/users/profile/${id}`);

         if (response?.data?.success) {
            set({ profile: response?.data?.user });
            // toast.success(response?.data?.message);
         } else {
            set({ error: response?.data?.message });
            // toast.success(response?.data?.message);
         }
      } catch (error) {
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            set({ error: error.response.data.message });
         } else {
            set({ error: "An error occurred. Please try again later" });
         }
      } finally {
         set({ loading: false });
      }
   },

   followUser: async (id) => {
      set({ followLoading: true, error: null });
      try {
         const response = await axios.post(`/api/v1/users/${id}/follow`);

         if (response.data.success) {
            // toast.success(response.data.message);
         } else {
            // toast.error(response.data.message);
         }
      } catch (error) {
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            set({ error: error.response.data.message });
         } else {
            set({ error: "An error occurred. Please try again later" });
         }
      } finally {
         set({ followLoading: false });
      }
   },

   deleteUser: async (id) => {
      set({ loading: true, error: null });
      try {
         const response = await axios.delete(`/api/v1/users/${id}`);

         if (response.data.success) {
            // toast.success(response.data.message);
         } else {
            // toast.error(response.data.message);
         }
      } catch (error) {
         console.log("Error deleting comment:", error);
         set({ error: "An error occurred. Please try again later" });
      } finally {
         set({ loading: false });
      }
   },

   updateUser: async (id, credentials) => {
      console.log("credentials: ", credentials);
      console.log("id in updateUser: ", id);

      set({ loading: true, error: null });
      try {
         const response = await axios.put(
            `/api/v1/users/update/${id}`,
            credentials
         );
         if (response.data.success) {
            // toast.success(response.data.message);
            set({ profile: response.data.user });
         } else {
            // toast.error(response.data.message);
         }
      } catch (error) {
         console.log("Error updating user:", error);
         set({ error: "An error occurred. Please try again later" });
      } finally {
         set({ loading: false });
      }
   },
}));

export default useUserStore;
