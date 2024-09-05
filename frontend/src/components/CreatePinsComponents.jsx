import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { HiArrowCircleUp } from "react-icons/hi";

const CreatePinsComponents = ({
    setImageUrl,
    setTitle,
    setDescription,
    imageUrl,
}) => {
    const inputRef = useRef(null);
    //need to define this so that the image url can be stored after we check if the user has uploaded an image or not or isValidUrl

    const handleFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = e.target.result;
                setImageUrl(image);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex w-full items-center justify-center gap-14 max-md:flex-col max-sm:pb-20 sm:pb-10">
            {!imageUrl ? (
                <div className="flex border border-dashed rounded-3xl border-gray-400">
                    <div className="h-[30rem] w-96 max-sm:w-[20rem] rounded-3xl bg-gray-200 flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center flex-col">
                            <div
                                onClick={() => {
                                    inputRef.current.click();
                                    console.log("clicked");
                                }}
                            >
                                <HiArrowCircleUp className="text-5xl cursor-pointer text-blue-600" />
                            </div>
                            <p>Choose a file or drag and drop it here</p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            ref={inputRef}
                            accept="image/*"
                            onChange={handleFile}
                        />
                        <div className="w-full text-center">
                            <p className="py-2 font-bold ">OR</p>
                            <p className="pb-4">Upload with Image Url</p>
                            <input
                                type="text"
                                placeholder="Paste your image url here"
                                className="w-[70%] p-2 rounded-xl focus:outline-gray-500"
                                onChange={(e) => setImageUrl(e.target.value)}

                            />
                            <p className="text-[10px] pt-4"><span className="text-red-600">*</span>Note: The paste url features is only for direct paste, otherwise u will get error</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <img
                        src={imageUrl}
                        alt="img"
                        className="w-80 rounded-3xl"
                    />
                </div>
            )}
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm text-gray-600">
                        Title{" "}
                        <span className="text-red-500 font-semibold text-lg">
                            *
                        </span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Add a title"
                        className="xl:w-[30rem] lg:w-[28rem] md:w-[24rem] max-sm:w-[20rem] py-3 px-3 border-2 rounded-2xl focus:border focus:ring-4 focus:outline-none"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="description"
                        className="text-sm text-gray-600"
                    >
                        Description
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        placeholder="Add a detailed description"
                        className="xl:w-[30rem] lg:w-[28rem] md:w-[24rem] sm:w-[24rem] max-sm:w-[20rem] py-3 px-3 border-2 rounded-2xl focus:border focus:ring-4 focus:outline-none resize-none outline-none overflow-y-auto"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreatePinsComponents;
