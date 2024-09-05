import { Link, useLocation } from "react-router-dom";

const BodyElement = ({ pins }) => {
   const location = useLocation();
   const currentPath = location.pathname;

   console.log("Current Path", currentPath);
   const isPathProfile = currentPath.includes("profile");

   return (
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3 px-2 pb-10 max-sm:pt-2">
         {pins.map((pin) => (
            <div key={pin._id} className="mb-4 break-inside-avoid">
               <div className=" overflow-hidden">
                  <div className="relative overflow-hidden group">
                     <img
                        src={pin.imageUrl}
                        className="w-full h-auto object-cover rounded-2xl"
                        alt={pin.title}
                     />
                     <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 rounded-2xl transition-opacity duration-300 flex items-center justify-center">
                        <Link
                           to={`/pin/${pin._id}`}
                           className="bg-blue-500 px-6 py-2 text-white rounded-3xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                           View
                        </Link>
                     </div>
                  </div>

                  {!isPathProfile && (
                     <div className="p-2">
                        <h1 className="text-lg font-semibold truncate">
                           {pin.title}
                        </h1>
                        <Link
                           to={`/profile/${pin?.createdBy._id}`}
                           className="flex items-center gap-2 mt-2"
                        >
                           <img
                              src={pin.createdBy.profilePicture}
                              className="w-8 h-8 rounded-full object-cover"
                              alt={pin.createdBy.username}
                              loading="lazy"
                           />
                           <p className="text-sm">{pin.createdBy.username}</p>
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         ))}
      </div>
   );
};

export default BodyElement;
