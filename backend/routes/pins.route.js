import {Router} from "express";
import { create, deletePin, getAllPins,getFollowingPins,getPin, likePin, searchPins } from "../controllers/pins.controller.js";

const router = Router();

router.post("/create", create);
router.get("/", getAllPins);
router.put("/:pinId");
router.delete("/:pinId", deletePin);
router.post("/:pinId/like", likePin);
//i need to change this route name , coz it conflicts with the getPin route===
router.get("/search-pins", searchPins);
//route to get the post of the users that i follow
router.get("/following", getFollowingPins);  
//need to put this route at the end of the file, coz it conflicts with the search===
router.get("/:pinId", getPin);


export default router;