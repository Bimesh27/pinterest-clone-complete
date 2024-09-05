import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
   {
      text: {
         type: String,
         required: true,
      },
      postedBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      pin: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Pin",
         required: true,
      },
      createdAt: {
         type: Date,
         default: Date.now,
      },
      updatedAt: {
         type: Date,
         default: Date.now,
      },
   },
   { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
