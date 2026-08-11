import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Task from "../models/Task.js";

const createToken = (userId) => {
    return jwt.sign(
        {
            id: userId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Required fields
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Password confirmation
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        // Create one task document for the user
        await Task.create({
            user: user._id,
            tasks: [],
        });

        // Create JWT
        const token = createToken(user._id);

        // Set HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Register error:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = createToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

// CURRENT USER
export const getMe = async (req, res) => {
    try {
        return res.status(200).json({
            message: "User fetched successfully",
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
            },
        });
    } catch (error) {
        console.error("Get me error:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

// LOGOUT
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
        });

        return res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};