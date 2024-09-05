import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const usePinStore = create((set) => ({
   pins: [],
   followingPins: [],
   loading: null,
   error: null,
   specificPin: null,
   searchedPins: [],
   deleteLoading: null,

   getAllPins: async () => {
      set({ loading: true, error: null });
      try {
         const response = await axios.get("/api/v1/pins");

         if (response.data.success) {
            set({ pins: response.data.pins });
            // toast.success(response.data.message);
         } else {
            set({ error: response.data.message });
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
         set({ loading: false });
      }
   },

   createPin: async (credentials) => {
      set({ loading: true, error: null });
      try {
         const response = await axios.post("/api/v1/pins/create", credentials);

         if (response.data.success) {
            set((state) => ({ pins: [...state.pins, response.data.pin] }));
            // toast.success(response.data.message);
         } else {
            toast.error(response.data.message);
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
      }
   },

   getFollowingPins: async () => {
      set({ loading: true, error: null });
      try {
         const response = await axios.get("/api/v1/pins/following");

         if (response.data.success) {
            set({ followingPins: response.data.pins });
            // toast.success(response.data.message);
         } else {
            set({ error: response.data.message, followingPins: [] });
            // toast.error(response.data.message);
         }
      } catch (error) {
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            set({ error: error.response.data.message, followingPins: [] });
         } else {
            set({ error: "An error occurred. Please try again later" });
         }
      } finally {
         set({ loading: false });
      }
   },

   getPinById: async (pinId) => {
      set({ loading: true, error: null });
      // toast.success(pinId)
      try {
         const response = await axios.get(`/api/v1/pins/${pinId}`);

         if (response.data.success) {
            // toast.success(response.data.message);
            set({ specificPin: response.data.pin });
         } else {
            set({ error: response.data.message });
            // toast.error(response.data.message);
         }
      } catch (error) {
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            set({ error: error.response.data.message, specificPin: null });
         } else {
            set({ error: "An error occurred. Please try again later" });
         }
      } finally {
         set({ loading: false });
      }
   },

   likePins: async (pinId) => {
      set({ loading: true, error: null });
      try {
         const response = await axios.post(`/api/v1/pins/${pinId}/like`);

         if (response.data.success) {
            // toast.success(response.data.message);
         } else {
            // toast.error(response.data.message);
         }
      } catch (error) {
         console.error("Error fetching comments:", error);
         set({ error: "An error occurred. Please try again later" });
         // toast.error("An error occurred. Please try again later");
      } finally {
         set({ loading: false });
      }
   },

   deletePin: async (pinId) => {
      set({ deleteLoading: true, error: null });

      try {
         const response = await axios.delete(`/api/v1/pins/${pinId}`);

         if (response.data.success) {
            // toast.success(response.data.message);
            set((state) => ({
               pins: state.pins.filter((pin) => pin._id !== pinId),
            }));
         } else {
            set({ error: response.data.message });
            // toast.error(response.data.message);
         }
      } catch (error) {
         console.error("Error fetching comments:", error);
         set({ error: "An error occurred. Please try again later" });
      } finally {
         set({ deleteLoading: false });
      }
   },

   searchPin: async (query) => {
      set({ loading: true, error: null });
      try {
         const response = await axios.get(
            `/api/v1/pins/search-pins?query=${query}`
         );

         if (response.data.success) {
            set({ searchedPins: response.data.pins });
            // toast.success(response.data.message);
         } else {
            set({ error: response.data.message });
            // toast.error(response.data.message);
         }
      } catch (error) {
         console.error("Error fetching comments:", error);
         set({ error: "An error occurred. Please try again later" });
      } finally {
         set({ loading: false });
      }
   },
}));

export default usePinStore;
