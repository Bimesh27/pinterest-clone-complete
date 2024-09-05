import envConfig from "../config/envConfig.js";
// import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authenticateMiddleware = async (req, res, next) => {
   try {
      const token = req.cookies.token;
      if (!token) {
         return res.status(401).json({
            success: false,
            message: "Unauthorized, No token found",
         });
      }

      const decoded = jwt.verify(token, envConfig.JWT_SECRET);
      if (!decoded) {
         return res.status(401).json({
            success: false,
            message: "Unauthorized, Invalid token",
         });
      }

      const userId = decoded.userId;
      console.log("userId", userId);

      // const user = await User.findById(userId);
      // if(!user) {
      //    return res.status(404).json({
      //       success: false,
      //       message: "User not found"
      //    })
      // }

      req.user = userId;
      next();

   } catch (error) {
      console.log("Error in authenticateMiddleware", error.message);
      return res.status(500).json({
         success: false,
         message: "Internal Server Error",
      });
   }
};
