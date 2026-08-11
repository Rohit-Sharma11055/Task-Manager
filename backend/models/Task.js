import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        dueDate: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            required: true,
        },

        category: {
            type: String,
            enum: [
                "Work",
                "Study",
                "Personal",
                "Health",
                "Finance",
                "Other",
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const taskDocumentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        tasks: [taskSchema],
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskDocumentSchema);

export default Task;