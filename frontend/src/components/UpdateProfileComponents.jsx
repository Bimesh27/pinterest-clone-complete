import React, { useRef } from "react";
import { MdOutlineEdit } from "react-icons/md";

const UpdateProfileComponents = ({
    profile,
    getUserProfile,
    id,
    profilePicture,
    setUsername,
    setBio,
    setProfilePicture,
}) => {
    const imageRef = useRef(null);

    const handleFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = e.target.result;
                setProfilePicture(image);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="rounded-full overflow-hidden">
                <div className="relative rounded-full group object-cover object-center ">
                    <img
                        src={profilePicture || profile?.profilePicture}
                        alt={profile?.username}
                        className="max-sm:size-60 size-72 object-cover object-center rounded-full"
                    />
                    <div className="hidden group-hover:block transition-transform duration-500 transform scale-90 group-hover:scale-100 cursor-pointer bg-gray-100 bg-opacity-40 p-4 absolute top-[60%] right-[40%] rounded-full">
                        <MdOutlineEdit
                            className="text-2xl"
                            onClick={() => imageRef.current?.click()}
                        />
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imageRef}
                    onChange={handleFile}
                />
            </div>
            <div className="flex flex-col pt-10 gap-6">
                <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder={profile?.username}
                        className="border border-black py-2 px-4 rounded-2xl outline-none"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="bio">Bio</label>
                    <input
                        type="text"
                        name="bio"
                        id="bio"
                        placeholder={profile?.bio}
                        className="border border-black py-2 px-4 rounded-2xl outline-none"
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateProfileComponents;
