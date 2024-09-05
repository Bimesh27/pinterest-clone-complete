import { Router } from "express";
import {
    register,
    login,
    logout,
    getCurrentUser,
} from "../controllers/auth.controller.js";
import { authenticateMiddleware } from "../middlewares/authenticaticateMiddleware.js";
import {
    loginRateLimiter,
    registerRateLimiter,
} from "../middlewares/authRateLimiter.js";

const router = Router();

router.post("/register", registerRateLimiter, register);
router.post("/login", loginRateLimiter, login);
router.post("/logout", logout);
router.get("/me", authenticateMiddleware, getCurrentUser);

export default router;
