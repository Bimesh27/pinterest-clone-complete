import NavBar from "../components/NavBar";
import CreatePinsComponents from "../components/CreatePinsComponents";
import usePinStore from "../store/pinStore";
import { useState } from "react";
import NavBarForSmallerScreen from "../components/NavBarForSmallerScreen";
import { useNavigate } from "react-router-dom";
import Loading from "../assets/ThreeDotLoading";

const CreatePage = () => {
   const navigate = useNavigate();
   const [imageUrl, setImageUrl] = useState(null);
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");

   const { createPin, loading } = usePinStore();

   const credentials = {
      title,
      description,
      imageUrl,
   };

   const handleClick = async () => {
      await createPin(credentials);
      navigate("/");
   };

   return (
      <div className="w-full relative h-full">
         <div className="h-20 bg-green-500 w-full max-sm:hidden">
            <NavBar />
         </div>
         <div className="bg-white h-12 w-full z-50 bottom-0 fixed flex items-center sm:hidden">
            <NavBarForSmallerScreen />
         </div>
         <div className=" flex justify-between px-8 w-full items-center h-20">
            <h1 className="text-xl font-semibold">Create Pin</h1>
            <button
               className="bg-blue-500 py-3 px-4 text-white rounded-3xl font-semibold"
               onClick={handleClick}
               disabled={loading}
            >
               {loading ? <Loading /> : "Publish"}
            </button>
         </div>
         <div className="pt-6">
            <CreatePinsComponents
               setImageUrl={setImageUrl}
               setTitle={setTitle}
               setDescription={setDescription}
               imageUrl={imageUrl}
            />
         </div>
      </div>
   );
};

export default CreatePage;
