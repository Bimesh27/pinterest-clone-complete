import axios from "axios";
import { useState } from "react";
import { FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordShow, setPasswordShow] = useState(false);

   const { login } = useAuthStore();

   const submitHandler = async () => {
      if (!email || !password) {
         toast.error("Please fill all the fields");
         return;
      }

      if (password.length < 6) {
         toast.error("Password must be at least 6 characters");
         return;
      }

      try {
         await login({ email, password });
      } catch (error) {
         toast.error("An error occurred. Please try again later");
      }
   };

   return (
      <div className="w-full h-screen flex justify-center items-center bg-nature bg-cover bg-center">
         <div className=" w-[30rem] max-sm:w-[22rem] h-[40rem] max-sm:h-[30rem] rounded-3xl custom-glass">
            <div className="flex flex-col text-center w-full items-center gap-4 pt-8 max-sm:gap-2 max-sm:py-4">
               <div>
                  <FaPinterest className="text-5xl text-blue-600 max-sm:text-4xl" />
               </div>
               <div>
                  <h1 className="font-semibold text-3xl max-sm:text-2xl">
                     Welcome to Pinterest
                  </h1>
                  <p className="max-sm:text-sm">Find new ideas to try</p>
               </div>
               <div className="flex flex-col text-start w-[55%] max-sm:w-[70%] ">
                  <label htmlFor="email" className="mx-2 max-sm:text-sm">
                     Email
                  </label>
                  <input
                     type="email"
                     required
                     name="email"
                     placeholder="Email"
                     className="px-4 rounded-2xl border border-gray-400 py-3 max-sm:py-[0.5rem] max-sm:rounded-xl text-sm"
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className="flex flex-col text-start w-[55%] relative max-sm:w-[70%] ">
                  <label htmlFor="password" className="mx-2 max-sm:text-sm">
                     Password
                  </label>
                  <input
                     type={passwordShow ? "text" : "password"}
                     required
                     name="password"
                     placeholder="Password"
                     className="px-4 rounded-2xl border border-gray-400 py-3 max-sm:py-[0.5rem] max-sm:rounded-xl text-sm"
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordShow ? (
                     <IoMdEye
                        className="absolute right-5 max-sm:right-3 top-9 max-sm:top-[1.8rem] text-xl"
                        onClick={() => setPasswordShow(!passwordShow)}
                     />
                  ) : (
                     <IoMdEyeOff
                        className="absolute right-5 max-sm:right-3 top-9 max-sm:top-[1.8rem] text-xl"
                        onClick={() => setPasswordShow(!passwordShow)}
                     />
                  )}
               </div>

               <div
                  className="w-[55%] bg-blue-600 h-10 max-sm:w-[40%] flex justify-center rounded-full font-semibold mt-4 cursor-pointer hover:bg-blue-700 transition-all"
                  onClick={submitHandler}
               >
                  <button className="text-white">Login</button>
               </div>
               <div className="w-[58.1%] max-sm:w-[70%]">
                  <p className="text-center max-sm:text-sm">
                     By continuing, you are successfully enter fake pinterest
                     hehe, and there is no <strong>Term of Service</strong> and{" "}
                     <strong>Privacy Policy</strong>
                  </p>
               </div>
               <p className="text-sm">
                  Not on pinterest yet?
                  <Link to="/register" className="font-semibold">
                     {" "}
                     Sign in
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
