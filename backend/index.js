import express from "express";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import envConfig from "./config/envConfig.js";
import { connectDB } from "./config/connectDB.js";
import { authenticateMiddleware } from "./middlewares/authenticaticateMiddleware.js";

import authRoutes from "./routes/auth.route.js";
import pinsRoutes from "./routes/pins.route.js";
import userRoutes from "./routes/user.route.js";
import commentRoutes from "./routes/comment.route.js";

import path from "path";

const app = express();

cloudinary.config({
   cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
   api_key: envConfig.CLOUDINARY_API_KEY,
   api_secret: envConfig.CLOUDINARY_API_SECRET,
});

const __dirname = path.resolve();

app.use(
   express.json({
      limit: "15mb",
   })
);

app.use(express.urlencoded({ limit: "15mb", extended: true }));
app.use(cookieParser());

const PORT = envConfig.PORT || 3000;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", authenticateMiddleware, userRoutes);
app.use("/api/v1/pins", authenticateMiddleware, pinsRoutes);
app.use("/api/v1/comments", authenticateMiddleware, commentRoutes);

if (envConfig.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "frontend", "dist")));

   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
   });
}

app.listen(PORT, () => {
   connectDB();
   console.log("Server is running on port", PORT);
});
