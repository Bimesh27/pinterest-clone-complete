import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (req, res) => {
    // console.log("Registering user");

    try {
        const { username, email, password, profilePicture, bio } = req.body;

        // Check if all fields are provided and valid
        const checkRegisterCredentials = (username, email, password) => {
            if (!username || !email || !password) {
                return { isValid: false, message: "Please fill in all fields" };
            }

            if (username.length < 3) {
                return {
                    isValid: false,
                    message: "Username must be at least 3 characters long",
                };
            }

            if (password.length < 6) {
                return {
                    isValid: false,
                    message: "Password must be at least 6 characters long",
                };
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return {
                    isValid: false,
                    message: "Please provide a valid email address",
                };
            }

            return { isValid: true };
        };

        const checkCredentials = checkRegisterCredentials(
            username,
            email,
            password
        );
        if (!checkCredentials.isValid) {
            return res
                .status(400)
                .json({ success: false, message: checkCredentials.message });
        }

        // Check if username or email already exists
        const isUsernameExists = await User.findOne({ username });
        if (isUsernameExists) {
            return res
                .status(400)
                .json({ success: false, message: "Username already exists" });
        }

        const isEmailExists = await User.findOne({ email });
        if (isEmailExists) {
            return res
                .status(400)
                .json({ success: false, message: "Email already exists" });
        }

        // Hash password and save user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePicture: profilePicture,
            bio,
        });

        const savedUser = await newUser.save();

        // Generate token and send successful response
        generateTokenAndSetCookie(savedUser._id, res);

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                profilePicture: savedUser.profilePicture,
                bio: savedUser.bio,
                pins: savedUser.pins,
                followers: savedUser.followers,
                following: savedUser.following,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt,
            },
        });
    } catch (error) {
        console.log("Error while registering user", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkLoginCredentials = (email, password) => {
            if (!email || !password) {
                return { isValid: false, message: "Please fill in all fields" };
            }

            if (!emailRegex.test(email)) {
                return {
                    isValid: false,
                    message: "Please provide a valid email address",
                };
            }

            if (password.length < 6) {
                return {
                    isValid: false,
                    message: "Password must be at least 6 characters long",
                };
            }
            return { isValid: true };
        };

        const checkCredentials = checkLoginCredentials(email, password);
        if (!checkCredentials.isValid) {
            return res
                .status(400)
                .json({ success: false, message: checkCredentials.message });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                bio: user.bio,
                pins: user.pins,
                followers: user.followers,
                following: user.following,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (error) {
        console.log("Error while logging in user", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res
            .status(200)
            .json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.log("Error while logging out user", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user;
        console.log("userId after get", userId);

        const user = await User.findById(userId).populate({
            path:"following",
            select:"-password"
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Current user fetched successfully",
            user: user
        });
    } catch (error) {
        console.log("Error while getting current user", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
