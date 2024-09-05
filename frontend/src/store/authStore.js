import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const useAuthStore = create((set) => ({
   user: null,
   loading: null,
   error: null,

   register: async (credentials) => {
      set({ loading: true, error: null });
      try {
         const response = await axios.post(
            "/api/v1/auth/register",
            credentials
         );

         if (response.data.success) {
            // toast.success(response.data.message);
            set({ user: response.data.user });
         } else {
            toast.error(response.data.message);
            set({ error: response.data.message });
         }
         console.log(response.data);
      } catch (error) {
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            toast.error(error.response.data.message);
            set({ error: error.response.data.message });
         } else {
            toast.error("An error occurred. Please try again later");
         }

         console.log("Error while registering user", error.message);
      } finally {
         set({ loading: false });
      }
   },

   login: async (credentials) => {
      set({ loading: true, error: null });

      try {
         const response = await axios.post("/api/v1/auth/login", credentials);

         if (response.data.success) {
            // toast.success(response.data.message);
            set({ user: response.data.user });
         } else {
            toast.error(response.data.message);
            set({ error: response.data.message });
         }
         console.log(response.data);
      } catch (error) {
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            toast.error(error.response.data.message);
            set({ error: error.response.data.message });
         } else {
            toast.error("An error occurred. Please try again later");
         }
      } finally {
         set({ loading: false });
      }
   },

   logout: async () => {
      set({ loading: true, error: null });
      try {
         const response = await axios.post("/api/v1/auth/logout");

         if (response.data.success) {
            // toast.success(response.data.message);
            set({ user: null });
            navigate("/login");
         } else {
            // toast.error(response.data.message);
            set({ error: response.data.message });
         }
      } catch (error) {
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            toast.error(error.response.data.message);
            set({ error: error.response.data.message });
         } else {
            set({ error: "An error occurred. Please try again later" });
         }
      } finally {
         set({ loading: false });
      }
   },

   getMe: async () => {
      try {
         const response = await axios.get("/api/v1/auth/me");

         if (response.data.success) {
            set({ user: response.data.user });
         } else {
            set({ user: null });
         }
      } catch (error) {
         set({ user: null });
      }
   },
}));

export default useAuthStore;
