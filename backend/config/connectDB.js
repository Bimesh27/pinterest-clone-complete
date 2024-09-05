import mongoose from "mongoose";
import envConfig from "./envConfig.js";

export const connectDB = async (req, res) => {
   try {
      const conn = await mongoose.connect(envConfig.MONGO_URI);
      console.log(`MongoDB connected: ${conn.connection.host}`);
   } catch (error) {
      console.log("Error while connecting to database", error.message);
      return res.status(500).json({ message: "Internal server error" });
   }
};
