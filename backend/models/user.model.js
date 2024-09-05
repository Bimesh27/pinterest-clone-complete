import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address",
            ],
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be at least 6 characters long"],
        },
        profilePicture: {
            type: String,
            // this function will be called when the default value is needed
            default: function () {
                const defaultPictures = [
                    "https://i.pinimg.com/564x/bf/2b/9e/bf2b9edc61e8879e5c65e4601dd7cb20.jpg",
                    "https://i.pinimg.com/564x/d6/a5/d8/d6a5d814abd1fc5629b57e3d94dfcc02.jpg",
                    "https://i.pinimg.com/564x/fb/24/64/fb2464b4f8838ae7c004d37bebbc43f0.jpg",
                    "https://i.pinimg.com/736x/42/5e/08/425e0808d078adde6a9d87dc0d58837b.jpg",
                ];
                return defaultPictures[
                    Math.floor(Math.random() * defaultPictures.length)
                ];
            },
        },
        bio: {
            type: String,
            maxlength: [120, "Bio can not be longer than 120 characters"],
            default: "",
        },
        pins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Pin",
                default: [],
            },
        ],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
