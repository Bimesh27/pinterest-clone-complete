import rateLimit from "express-rate-limit";

export const loginRateLimiter = rateLimit({
   //its it saying u can only make 5 requests in 15 minutes======
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 10, // limit each IP to 100 requests per windowMs
   message: "Too many requests from this IP, please try again after 15 minutes",
})

export const registerRateLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 10, // limit each IP to 100 requests per windowMs
   message: "Too many requests from this IP, please try again after 15 minutes",
})