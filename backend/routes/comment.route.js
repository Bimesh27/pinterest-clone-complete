import { Router } from "express";
import { deleteComment, getComments, updateComment, writeComment } from "../controllers/comment.controller.js";

const router = Router();

router.post("/:postId", writeComment);
router.delete("/:commentId", deleteComment);
router.get("/:postId", getComments);
router.put("/:commentId", updateComment);
// router.post("/:commentId", likeComment);

export default router;