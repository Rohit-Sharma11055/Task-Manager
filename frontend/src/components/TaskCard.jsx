import { useState } from "react";
import { HiCheck, HiPencil, HiTrash } from "react-icons/hi";

import styles from "../constants/styles";

const TaskCard = ({
    task,
    expandedTaskId,
    setExpandedTaskId,
    onToggleStatus,
    onEdit,
    onDelete,
}) => {
    const isExpanded = expandedTaskId === task._id;

    const handleCardClick = () => {
        setExpandedTaskId(
            isExpanded ? null : task._id
        );
    };

    const getDueDateText = () => {
        if (!task.dueDate) {
            return "No due date";
        }

        const dueDate = new Date(task.dueDate);

        const today = new Date();

        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);

        const difference =
            dueDate.getTime() - today.getTime();

        const daysLeft = Math.round(
            difference / (1000 * 60 * 60 * 24)
        );

        const formattedDate = dueDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

        let relativeText;

        if (task.status === "completed") {
            relativeText = "Completed";
        } else if (daysLeft === 0) {
            relativeText = "Due today";
        } else if (daysLeft === 1) {
            relativeText = "1 day left";
        } else if (daysLeft > 1) {
            relativeText = `${daysLeft} days left`;
        } else {
            relativeText = "Overdue";
        }

        return `${formattedDate} • ${relativeText}`;
    };

    return (
        <article
            onClick={handleCardClick}
            className={`
                ${styles.taskCard}
                ${isExpanded ? styles.taskCardExpanded : ""}
            `}
        >
            <div className={styles.taskCardTop}>
                <div className="min-w-0">
                    <div className={styles.taskCardTitleRow}>
                        <h3
                            className={`
                                ${styles.taskCardTitle}
                                ${
                                    task.status === "completed"
                                        ? styles.completedTaskTitle
                                        : ""
                                }
                            `}
                        >
                            {task.title}
                        </h3>

                        {task.status === "completed" && (
                            <span
                                className={
                                    styles.completedBadge
                                }
                            >
                                <HiCheck />
                                Completed
                            </span>
                        )}
                    </div>

                    <p className={styles.taskCardDescription}>
                        {task.description}
                    </p>
                </div>

                <span
                    className={
                        styles.taskCardExpandIndicator
                    }
                >
                    {isExpanded ? "−" : "+"}
                </span>
            </div>

            <div className={styles.taskCardMeta}>
                <span
                    className={styles.categoryBadge}
                >
                    {task.category}
                </span>

                <span
                    className={`${styles.priorityBadge} ${
                        styles[`priority${task.priority}`]
                    }`}
                >
                    {task.priority}
                </span>

                <span className={styles.dueDate}>
                    {getDueDateText()}
                </span>
            </div>

            {isExpanded && (
                <div
                    className={styles.taskCardDetails}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>
                            Description
                        </span>

                        <p className={styles.detailValue}>
                            {task.description}
                        </p>
                    </div>

                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>
                            Status
                        </span>

                        <span className={styles.detailValue}>
                            {task.status === "completed"
                                ? "Completed"
                                : "Pending"}
                        </span>
                    </div>

                    <div className={styles.taskActions}>
                        <button
                            type="button"
                            onClick={() =>
                                onToggleStatus(task._id)
                            }
                            className={
                                styles.taskActionButton
                            }
                        >
                            <HiCheck />

                            {task.status === "completed"
                                ? "Mark Pending"
                                : "Complete"}
                        </button>

                        <button
                            type="button"
                            onClick={() => onEdit(task)}
                            className={
                                styles.taskActionButton
                            }
                        >
                            <HiPencil />
                            Edit
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                onDelete(task._id)
                            }
                            className={
                                styles.deleteActionButton
                            }
                        >
                            <HiTrash />
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </article>
    );
};

export default TaskCard;