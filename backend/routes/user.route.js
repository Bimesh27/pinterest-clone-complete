import { Router } from "express";
import {
   deleteUser,
   followUser,
   getUser,
   getUserPins,
   update,
} from "../controllers/user.controller.js";

const router = Router();

router.put("/update/:id", update);
router.get("/profile/:id", getUser);
router.delete("/:id", deleteUser);
router.get("/:userId/pins", getUserPins);
router.post("/:userId/follow", followUser);

export default router;
