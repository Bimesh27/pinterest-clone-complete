import { v2 as cloudinary } from "cloudinary";

import Comment from "../models/comment.model.js";
import Pin from "../models/pin.model.js";
import User from "../models/user.model.js";

export const create = async (req, res) => {
   try {
      const userId = req.user;
      console.log("userIdinCreatePins", userId);

      const { title, description } = req.body;
      let { imageUrl } = req.body;

      if (!title || !imageUrl) {
         return {
            isValid: false,
            message: "Title and Image URL are required",
         };
      }

      if (imageUrl) {
         const uploadedResponse = await cloudinary.uploader.upload(imageUrl);
         imageUrl = uploadedResponse.secure_url;
      }

      const newPin = new Pin({
         title,
         description,
         imageUrl,
         createdBy: userId,
      });

      const savedPin = await newPin.save();

      await User.findByIdAndUpdate(userId, {
         $push: { pins: savedPin._id },
      });

      return res.status(201).json({
         success: true,
         message: "Pin created successfully",
         pin: savedPin,
      });
   } catch (error) {
      console.log("Error in creating pin: ", error.message);
      return res
         .status(500)
         .json({ success: false, message: "Internal server error" });
   }
};

export const getPin = async (req, res) => {
   try {
      const { pinId } = req.params;
      console.log("pinId", pinId);

      const pin = await Pin.findById(pinId).populate([
         {
            path: "createdBy",
            select: "-password",
         },
         {
            path: "comments",
            select: "-password",
         },
      ]);
      if (!pin)
         return res.status(400).json({
            success: false,
            message: "Pin not found",
         });

      return res.status(200).json({
         success: true,
         message: "Pin fetched successfully",
         pin: pin,
      });
   } catch (error) {
      console.log("Error in getPin: ", error.message);
      return res
         .status(500)
         .json({ success: false, message: "Internal server error" });
   }
};

export const getAllPins = async (req, res) => {
   try {
      const pins = await Pin.find().populate("createdBy");
      if (!pins)
         return res.status(400).json({
            success: false,
            message: "No pins found",
         });

      return res.status(200).json({
         success: true,
         message: "Pins fetched successfully",
         pins: pins,
      });
   } catch (error) {
      console.log("Error in getAllPins: ", error.message);
      return res
         .status(500)
         .json({ success: false, message: "Internal server error" });
   }
};

export const deletePin = async (req, res) => {
   try {
      const userId = req.user;
      const { pinId } = req.params;
      console.log("UserId in deletePin", typeof userId, userId);

      console.log("PinId in deletePin", typeof pinId, pinId);

      const pin = await Pin.findById(pinId);
      if (!pin)
         return res.status(400).json({
            success: false,
            message: "Pin not found",
         });

      if (pin.createdBy.toString() !== userId) {
         return res.status(401).json({
            success: false,
            message: "Unauthorized to delete this pin",
         });
      }

      const image = pin.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(image);

      const deletedPin = await Pin.findByIdAndDelete(pinId);
      await User.findByIdAndUpdate(userId, {
         $pull: { pins: pinId },
      });

      // i hope this works hehe===================didnt check this. ill check this later
      await Comment.deleteMany({ pin: pinId });

      return res.status(200).json({
         success: true,
         message: "Pin deleted successfully",
         deletePin: deletedPin,
      });
   } catch (error) {
      console.log("Error in deletePin: ", error.message);
      return res
         .status(500)
         .json({ success: false, message: "Internal server error" });
   }
};

export const likePin = async (req, res) => {
   try {
      const { pinId } = req.params;
      const userId = req.user;
      let action;

      const pin = await Pin.findById(pinId);
      if (!pin) {
         return res.status(400).json({
            success: false,
            message: "Pin not found",
         });
      }

      if (pin.likes.includes(userId)) {
         await Pin.findByIdAndUpdate(pinId, {
            $pull: { likes: userId },
         });
         action = "unliked";
      } else {
         await Pin.findByIdAndUpdate(pinId, {
            $push: { likes: userId },
         });
         action = "liked";
      }

      return res.status(200).json({
         success: true,
         message: `Pin ${action} successfully`,
      });
   } catch (error) {
      console.log("Error in likePin: ", error.message);
      return res.status(500).json({ message: "Internal server error" });
   }
};

export const searchPins = async (req, res) => {
   try {
      const { query } = req.query;

      if (!query) {
         return res.status(400).json({
            success: false,
            message: "Query is required",
         });
      }

      const pins = await Pin.find({
         $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
         ],
      }).populate("createdBy");

      if (pins.length === 0) {
         return res.status(400).json({
            success: false,
            message: "No pins found",
         });
      }

      return res.status(200).json({
         success: true,
         message: "Pins fetched successfully",
         pins: pins,
      });
   } catch (error) {
      console.log("Error in searchPins: ", error.message);
      return res
         .status(500)
         .json({ success: false, message: "Internal server error" });
   }
};

export const getFollowingPins = async (req, res) => {
   try {
      const userId = req.user; // Assuming req.user is the user ID
      console.log("User ID in getFollowingPins:", userId);

      // Fetch user details to get the list of following users
      const user = await User.findById(userId);
      console.log("User following", user.following);

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      const pins = await Pin.find({
         createdBy: { $in: user.following },
      }).populate({
         path: "createdBy",
         select: "-password",
      });

      // console.log("Pins Found:", pins);

      if (pins.length === 0) {
         return res.status(404).json({
            success: false,
            message: "No pins found",
            pins: [],
         });
      }

      return res.status(200).json({
         success: true,
         message: "Following pins fetched successfully",
         pins,
      });
   } catch (error) {
      console.error("Error in getFollowingPins:", error.message);
      return res.status(500).json({
         success: false,
         message: "Internal server error",
      });
   }
};
