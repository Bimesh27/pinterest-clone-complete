import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";

export const generateTokenAndSetCookie = (userId, res) => {
   console.log(typeof userId);
   
   const token = jwt.sign({ userId }, envConfig.JWT_SECRET, {
      expiresIn: "7d",
   });

   res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: envConfig.NODE_ENV === "production",
   });

};
