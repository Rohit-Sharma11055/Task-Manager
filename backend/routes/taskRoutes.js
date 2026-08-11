import express from "express";

import {
    createTask,
    getTasks,
    updateTask,
    toggleTaskStatus,
    deleteTask,
} from "../controllers/taskController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);

router.get("/", authMiddleware, getTasks);

router.put("/:id", authMiddleware, updateTask);

router.patch("/:id/status", authMiddleware, toggleTaskStatus);

router.delete("/:id", authMiddleware, deleteTask);

export default router;