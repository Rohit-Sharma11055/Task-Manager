import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";

import styles from "../constants/styles";

const getInitialForm = (task) => ({
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate
        ? new Date(task.dueDate)
              .toISOString()
              .split("T")[0]
        : "",
    priority: task?.priority || "",
    category: task?.category || "",
});

const TaskModal = ({
    task = null,
    onClose,
    onSuccess,
}) => {
    const isEditMode = Boolean(task);

    const [formData, setFormData] = useState(
        getInitialForm(task)
    );

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(getInitialForm(task));
        setError("");
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (
            !formData.title ||
            !formData.description ||
            !formData.priority ||
            !formData.category
        ) {
            setError(
                "Title, description, priority and category are required."
            );
            return;
        }

        try {
            setLoading(true);

            await onSuccess(formData);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    `Failed to ${
                        isEditMode
                            ? "update"
                            : "create"
                    } task.`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <div>
                        <h2 className={styles.modalTitle}>
                            {isEditMode
                                ? "Edit Task"
                                : "Create Task"}
                        </h2>

                        <p className={styles.modalSubtitle}>
                            {isEditMode
                                ? "Update your task details."
                                : "Add a new task to your list."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className={
                            styles.modalCloseButton
                        }
                    >
                        <HiX />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className={styles.modalForm}
                >
                    <div className={styles.fieldGroup}>
                        <label
                            htmlFor="title"
                            className={styles.label}
                        >
                            Title
                        </label>

                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter task title"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label
                            htmlFor="description"
                            className={styles.label}
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your task"
                            rows="4"
                            className={styles.textarea}
                        />
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                            <label
                                htmlFor="dueDate"
                                className={styles.label}
                            >
                                Due Date
                            </label>

                            <input
                                id="dueDate"
                                name="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={handleChange}
                                min={
                                    new Date()
                                        .toISOString()
                                        .split("T")[0]
                                }
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label
                                htmlFor="priority"
                                className={styles.label}
                            >
                                Priority
                            </label>

                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className={styles.input}
                            >
                                <option className={styles.inputOption} value="">
                                    Select priority
                                </option>

                                <option className={styles.inputOption} value="Low">
                                    Low
                                </option>

                                <option className={styles.inputOption} value="Medium">
                                    Medium
                                </option>

                                <option className={styles.inputOption} value="High">
                                    High
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label
                            htmlFor="category"
                            className={styles.label}
                        >
                            Category
                        </label>

                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option className={styles.inputOption} value="">
                                Select category
                            </option>

                            <option className={styles.inputOption} value="Work">
                                Work
                            </option>

                            <option className={styles.inputOption} value="Study">
                                Study
                            </option>

                            <option className={styles.inputOption} value="Personal">
                                Personal
                            </option>

                            <option className={styles.inputOption} value="Health">
                                Health
                            </option>

                            <option className={styles.inputOption} value="Finance">
                                Finance
                            </option>

                            <option className={styles.inputOption} value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    {error && (
                        <p className={styles.error}>
                            {error}
                        </p>
                    )}

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={
                                styles.secondaryButton
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className={
                                styles.primaryButton
                            }
                        >
                            {loading
                                ? isEditMode
                                    ? "Updating..."
                                    : "Creating..."
                                : isEditMode
                                ? "Update Task"
                                : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;