import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import FollowingPage from "./pages/FollowingPage";
import ViewPage from "./pages/ViewPage";
import SearchPinPage from "./pages/SearchPinPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import SearchPageForMobile from "./pages/SearchPageForMobile";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
   const { getMe, user, logout } = useAuthStore();

   useEffect(() => {
      getMe();
   }, [getMe, logout]);

   console.log("User", user);

   return (
      <div className="w-full h-full ">
         <Routes>
            <Route path="/" element={user ? <HomePage /> : <RegisterPage />} />
            <Route
               path="/profile/:id"
               element={user ? <ProfilePage /> : <LoginPage />}
            />
            <Route
               path="/register"
               element={!user ? <RegisterPage /> : <HomePage />}
            />
            <Route
               path="/login"
               element={!user ? <LoginPage /> : <HomePage />}
            />
            <Route
               path="/create"
               element={user ? <CreatePage /> : <LoginPage />}
            />
            <Route
               path="/following"
               element={user ? <FollowingPage /> : <LoginPage />}
            />
            <Route
               path="/pin/:postId"
               element={user ? <ViewPage /> : <LoginPage />}
            />
            <Route
               path="/search/pins"
               element={user ? <SearchPinPage /> : <LoginPage />}
            />
            <Route
               path="/update/:id"
               element={user ? <UpdateProfilePage /> : <LoginPage />}
            />
            <Route
               path="/search-mobile"
               element={user ? <SearchPageForMobile /> : <LoginPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
         </Routes>
         <Toaster />
      </div>
   );
};

export default App;
