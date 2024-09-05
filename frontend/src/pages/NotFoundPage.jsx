import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
   return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
         <div>
            <img
               src="https://i.pinimg.com/564x/e9/62/39/e9623991bddafcb7df36fab0e86a1720.jpg"
               alt="404"
               className="size-72"
            />
         </div>
         <h1>Why are u so fking dumb find the way quick</h1>
         <p className="p-6">
            Here just in case:{" "}
            <span className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-3xl font-semibold text-white">
               <Link to={"/"}>Home</Link>
            </span>
         </p>
      </div>
   );
};

export default NotFoundPage;
