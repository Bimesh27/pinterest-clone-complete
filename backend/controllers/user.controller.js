import Pin from "../models/pin.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUserId = req.user;
        console.log("currentUserId: ", currentUserId);

        const { username, email, bio } = req.body;
        let { profilePicture } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // console.log(typeof user._id, typeof currentUserId);
        if (user._id.toString() !== currentUserId) {
            return res
                .status(403)
                .json({ message: "You can update only your account" });
        }

        if (profilePicture) {
            const uploadedResponse = await cloudinary.uploader.upload(
                profilePicture
            );
            profilePicture = uploadedResponse.secure_url;
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.profilePicture = profilePicture || user.profilePicture;

        const updatedUser = await user.save();

        return res.status(200).json({
            success: true,
            message: "User has been updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.log("Error in update user: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate({
            path: "pins",
            select: "-password",
        });

        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found" });

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: user,
        });
    } catch (error) {
        console.log("Error while fetching user: ", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const currentUserId = req.user;
    const user = await User.findById(id);

    const checkUserExistsAndEqualWithCurrent = async (
        id,
        currentUserId,
        user
    ) => {
        if (!id) {
            return { isValid: false, message: "User id is required" };
        }
        if (!currentUserId) {
            return { isValid: false, message: "Current user id is required" };
        }

        if (!user) {
            return { isValid: false, message: "User not found" };
        }

        if (user._id.toString() !== currentUserId) {
            return {
                isValid: false,
                message: "You can delete only your account",
            };
        }
        return { isValid: true };
    };

    try {
        const validation = await checkUserExistsAndEqualWithCurrent(
            id,
            currentUserId,
            user
        );

        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }

        const userPins = await Pin.find({ createdBy: id });

        for (const pin of userPins) {
            const image = pin.imageUrl.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(image);
        }

        const deletedUser = await User.findByIdAndDelete(id);
        await Pin.deleteMany({ createdBy: id });
        await Pin.updateMany({ likes: id }, { $pull: { likes: id } });

        await User.updateMany({ followers: id }, { $pull: { followers: id } });
        await User.updateMany({ following: id }, { $pull: { following: id } });

        await Comment.deleteMany({ postedBy: id });

        // Correctly remove user ID from likes array

        return res.status(200).json({
            success: true,
            message: "User has been deleted successfully",
            user: deletedUser,
        });
    } catch (error) {
        console.log("Error while deleting user: ", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const getUserPins = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("userId: ", userId);

        const user = await User.findById(userId).populate("pins");
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({
            success: true,
            message: "User pins fetched successfully",
            pins: user.pins,
        });
    } catch (error) {
        console.log("Error while fetching user pins: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const followUser = async (req, res) => {
    try {
        const currentUserId = req.user;
        const { userId } = req.params;
        console.log("usertoFollowId: ", userId);
        let actions;

        if (currentUserId === userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot follow yourself",
            });
        }

        //user to follow is the "user" that we want to follow
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const currentUser = await User.findById(currentUserId);

        if (currentUser.following.includes(user._id)) {
            // if already following, then unfollow==============
            await currentUser.updateOne({
                $pull: { following: user._id },
            });
            await user.updateOne({
                $pull: { followers: currentUser._id },
            });
            actions = "unfollowed";
        } else {
            // if not following, then follow===================
            await currentUser.updateOne({
                $push: { following: user._id },
            });
            await user.updateOne({
                $push: { followers: currentUser._id },
            });
            actions = "followed";
        }

        return res.status(200).json({
            success: true,
            message: `User ${actions} successfully`,
        });
    } catch (error) {
        console.log("Error while following user: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
