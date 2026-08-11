import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        console.log("COOKIE TOKEN EXISTS:", !!token);
        console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

        if (!token) {
            return res.status(401).json({
                message: "Not authenticated",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED TOKEN:", decoded);

        const user = await User.findById(decoded.id).select(
            "-password"
        );

        console.log("USER FOUND:", !!user);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("AUTH ERROR:", error);

        return res.status(401).json({
            message: "Invalid or expired session",
        });
    }
};

export default authMiddleware;