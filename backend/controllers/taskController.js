import mongoose from "mongoose";

import Task from "../models/Task.js";

const allowedPriorities = ["Low", "Medium", "High"];

const allowedCategories = [
    "Work",
    "Study",
    "Personal",
    "Health",
    "Finance",
    "Other",
];

const allowedStatuses = ["pending", "completed"];

// CREATE TASK
export const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            dueDate,
            priority,
            category,
        } = req.body;

        // Required fields
        if (
            !title ||
            !description ||
            !priority ||
            !category
        ) {
            return res.status(400).json({
                message:
                    "Title, description, priority and category are required",
            });
        }

        // Validate title
        if (title.trim().length < 2) {
            return res.status(400).json({
                message: "Title must contain at least 2 characters",
            });
        }

        if (title.trim().length > 100) {
            return res.status(400).json({
                message: "Title cannot exceed 100 characters",
            });
        }

        // Validate description
        if (description.trim().length < 2) {
            return res.status(400).json({
                message:
                    "Description must contain at least 2 characters",
            });
        }

        if (description.trim().length > 1000) {
            return res.status(400).json({
                message:
                    "Description cannot exceed 1000 characters",
            });
        }

        // Validate priority
        if (!allowedPriorities.includes(priority)) {
            return res.status(400).json({
                message: "Invalid priority",
            });
        }

        // Validate category
        if (!allowedCategories.includes(category)) {
            return res.status(400).json({
                message: "Invalid category",
            });
        }

        // Validate due date
        let formattedDueDate = null;

        if (dueDate) {
            const parsedDate = new Date(dueDate);

            if (Number.isNaN(parsedDate.getTime())) {
                return res.status(400).json({
                    message: "Invalid due date",
                });
            }

            const today = new Date();

            today.setHours(0, 0, 0, 0);
            parsedDate.setHours(0, 0, 0, 0);

            if (parsedDate < today) {
                return res.status(400).json({
                    message:
                        "Due date cannot be in the past",
                });
            }

            formattedDueDate = parsedDate;
        }

        // Find user's task document
        const taskDocument = await Task.findOne({
            user: req.user._id,
        });

        if (!taskDocument) {
            return res.status(404).json({
                message: "Task document not found",
            });
        }

        // Add task
        taskDocument.tasks.push({
            title: title.trim(),
            description: description.trim(),
            dueDate: formattedDueDate,
            priority,
            category,
            status: "pending",
        });

        await taskDocument.save();

        const createdTask =
            taskDocument.tasks[
                taskDocument.tasks.length - 1
            ];

        return res.status(201).json({
            message: "Task created successfully",
            task: createdTask,
        });
    } catch (error) {
        console.error("Create task error:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

// GET TASKS
export const getTasks = async (req, res) => {
    try {
        const {
            search = "",
            status = "all",
            category = "all",
            priority = "all",
            page = 1,
            limit = 12,
        } = req.query;

        // Validate pagination
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (
            !Number.isInteger(pageNumber) ||
            pageNumber < 1
        ) {
            return res.status(400).json({
                message: "Invalid page number",
            });
        }

        if (
            !Number.isInteger(limitNumber) ||
            limitNumber < 1 ||
            limitNumber > 50
        ) {
            return res.status(400).json({
                message:
                    "Limit must be between 1 and 50",
            });
        }

        // Validate filters
        if (
            status !== "all" &&
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                message: "Invalid status filter",
            });
        }

        if (
            category !== "all" &&
            !allowedCategories.includes(category)
        ) {
            return res.status(400).json({
                message: "Invalid category filter",
            });
        }

        if (
            priority !== "all" &&
            !allowedPriorities.includes(priority)
        ) {
            return res.status(400).json({
                message: "Invalid priority filter",
            });
        }

        const taskDocument = await Task.findOne({
            user: req.user._id,
        });

        if (!taskDocument) {
            return res.status(404).json({
                message: "Task document not found",
            });
        }

        let filteredTasks = [...taskDocument.tasks];

        // Search by title
        if (search.trim()) {
            const searchText = search
                .trim()
                .toLowerCase();

            filteredTasks = filteredTasks.filter((task) =>
                task.title
                    .toLowerCase()
                    .includes(searchText)
            );
        }

        // Status filter
        if (status !== "all") {
            filteredTasks = filteredTasks.filter(
                (task) => task.status === status
            );
        }

        // Category filter
        if (category !== "all") {
            filteredTasks = filteredTasks.filter(
                (task) => task.category === category
            );
        }

        // Priority filter
        if (priority !== "all") {
            filteredTasks = filteredTasks.filter(
                (task) => task.priority === priority
            );
        }

        // Pending first, then completed.
        // Newest first within each group.
        filteredTasks.sort((a, b) => {
            if (
                a.status === "pending" &&
                b.status === "completed"
            ) {
                return -1;
            }

            if (
                a.status === "completed" &&
                b.status === "pending"
            ) {
                return 1;
            }

            return (
                new Date(b.createdAt) -
                new Date(a.createdAt)
            );
        });

        // Statistics based on filtered results
        const totalTasks = filteredTasks.length;

        const pendingTasks = filteredTasks.filter(
            (task) => task.status === "pending"
        ).length;

        const completedTasks = filteredTasks.filter(
            (task) => task.status === "completed"
        ).length;

        // Pagination
        const totalPages =
            totalTasks === 0
                ? 0
                : Math.ceil(totalTasks / limitNumber);

        const startIndex =
            (pageNumber - 1) * limitNumber;

        const paginatedTasks = filteredTasks.slice(
            startIndex,
            startIndex + limitNumber
        );

        return res.status(200).json({
            message: "Tasks fetched successfully",

            tasks: paginatedTasks,

            stats: {
                total: totalTasks,
                pending: pendingTasks,
                completed: completedTasks,
            },

            pagination: {
                page: pageNumber,
                limit: limitNumber,
                totalPages,
                totalTasks,
            },
        });
    } catch (error) {
        console.error("Get tasks error:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid task ID",
            });
        }

        const {
            title,
            description,
            dueDate,
            status,
            priority,
            category,
        } = req.body;

        // Find user's task document
        const taskDocument = await Task.findOne({
            user: req.user._id,
        });

        if (!taskDocument) {
            return res.status(404).json({
                message: "Task document not found",
            });
        }

        // Find task
        const task = taskDocument.tasks.id(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        // Validate title
        if (title !== undefined) {
            if (!title.trim()) {
                return res.status(400).json({
                    message: "Title is required",
                });
            }

            if (title.trim().length < 2) {
                return res.status(400).json({
                    message:
                        "Title must contain at least 2 characters",
                });
            }

            if (title.trim().length > 100) {
                return res.status(400).json({
                    message:
                        "Title cannot exceed 100 characters",
                });
            }

            task.title = title.trim();
        }

        // Validate description
        if (description !== undefined) {
            if (!description.trim()) {
                return res.status(400).json({
                    message: "Description is required",
                });
            }

            if (description.trim().length < 2) {
                return res.status(400).json({
                    message:
                        "Description must contain at least 2 characters",
                });
            }

            if (description.trim().length > 1000) {
                return res.status(400).json({
                    message:
                        "Description cannot exceed 1000 characters",
                });
            }

            task.description = description.trim();
        }

        // Validate due date
        if (dueDate !== undefined) {
            if (dueDate === null || dueDate === "") {
                task.dueDate = null;
            } else {
                const parsedDate = new Date(dueDate);

                if (Number.isNaN(parsedDate.getTime())) {
                    return res.status(400).json({
                        message: "Invalid due date",
                    });
                }

                const today = new Date();

                today.setHours(0, 0, 0, 0);
                parsedDate.setHours(0, 0, 0, 0);

                if (parsedDate < today) {
                    return res.status(400).json({
                        message:
                            "Due date cannot be in the past",
                    });
                }

                task.dueDate = parsedDate;
            }
        }

        // Validate status
        if (status !== undefined) {
            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid status",
                });
            }

            task.status = status;
        }

        // Validate priority
        if (priority !== undefined) {
            if (!allowedPriorities.includes(priority)) {
                return res.status(400).json({
                    message: "Invalid priority",
                });
            }

            task.priority = priority;
        }

        // Validate category
        if (category !== undefined) {
            if (!allowedCategories.includes(category)) {
                return res.status(400).json({
                    message: "Invalid category",
                });
            }

            task.category = category;
        }

        await taskDocument.save();

        return res.status(200).json({
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        console.error("Update task error:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

// TOGGLE TASK STATUS
export const toggleTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid task ID",
            });
        }

        const taskDocument = await Task.findOne({
            user: req.user._id,
        });

        if (!taskDocument) {
            return res.status(404).json({
                message: "Task document not found",
            });
        }

        const task = taskDocument.tasks.id(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        task.status =
            task.status === "pending"
                ? "completed"
                : "pending";

        await taskDocument.save();

        return res.status(200).json({
            message:
                task.status === "completed"
                    ? "Task completed successfully"
                    : "Task marked as pending",
            task,
        });
    } catch (error) {
        console.error(
            "Toggle task status error:",
            error
        );

        return res.status(500).json({
            message: "Server error",
        });
    }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid task ID",
            });
        }

        const taskDocument = await Task.findOne({
            user: req.user._id,
        });

        if (!taskDocument) {
            return res.status(404).json({
                message: "Task document not found",
            });
        }

        const task = taskDocument.tasks.id(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        task.deleteOne();

        await taskDocument.save();

        return res.status(200).json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error("Delete task error:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};