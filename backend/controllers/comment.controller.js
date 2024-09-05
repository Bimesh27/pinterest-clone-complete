import Comment from "../models/comment.model.js";
import Pin from "../models/pin.model.js";

export const writeComment = async (req, res) => {
   try {
      const { postId } = req.params;
      const userId = req.user;
      const { text } = req.body;
      console.log("UserID in writeComment", userId);

      const pin = await Pin.findById(postId);
      if (!pin) {
         return res.status(404).json({ message: "Pin not found" });
      }

      const newComment = new Comment({
         text,
         postedBy: userId,
         pin: postId,
      });

      await newComment.save();

      await Pin.findOneAndUpdate(pin._id, {
         $push: { comments: newComment._id },
      });

      return res.status(201).json({
         success: true,
         message: "Comment created successfully",
         comment: newComment,
      });
   } catch (error) {
      console.log("Error in writeComment", error.message);
      return res.status(500).json({ message: "Internal server error" });
   }
};

export const deleteComment = async (req, res) => {
   try {
      const { commentId } = req.params;
      const userId = req.user;

      const comment = await Comment.findById(commentId);
      if (!comment) {
         return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.postedBy.toString() !== userId) {
         return res.status(401).json({ message: "Unauthorized " });
      }

      const deletedComment = await Comment.findByIdAndDelete(commentId);
      await Pin.findByIdAndUpdate(comment.pin, {
         $pull: {
            comments: comment._id,
         },
      });

      return res.status(200).json({
         success: true,
         message: "Comment deleted successfully",
         deletedComment: deletedComment,
      });
   } catch (error) {
      console.log("Error in deleteComment", error.message);
      return res.status(500).json({ message: "Internal server error" });
   }
};

export const getComments = async (req, res) => {
   try {
      const { postId } = req.params;

      const pin = await Pin.findById(postId);
      if (!pin) {
         return res.status(404).json({ message: "Post not found" });
      }

      const comments = await Comment.find({ pin: postId }).populate("postedBy");
      if (!comments) {
         return res.status(404).json({ message: "Comments not found" });
      }

      return res.status(200).json({
         success: true,
         message: "Comments fetched successfully",
         comments: comments,
      });
   } catch (error) {
      console.log("Error in getComments", error.message);
      return res.status(500).json({ message: "Internal server error" });
   }
};

export const updateComment = async (req, res) => {
   try {
      const { commentId } = req.params;
      const { text } = req.body;
      const userId = req.user;

      const comment = await Comment.findById(commentId);
      if (!comment) {
         return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.postedBy.toString() !== userId) {
         return res.status(401).json({ message: "Unauthorized" });
      }

      comment.text = text;
      comment.updatedAt = new Date();

      await comment.save();

      return res.status(200).json({
         success: true,
         message: "Comment updated successfully",
         comment: comment,
      });
   } catch (error) {
      console.log("Error in updateComment", error.message);
      return res.status(500).json({ message: "Internal server error" });
   }
};
