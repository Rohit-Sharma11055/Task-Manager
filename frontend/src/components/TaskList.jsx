import TaskCard from "./TaskCard";
import styles from "../constants/styles";

const TaskList = ({
    tasks,
    expandedTaskId,
    setExpandedTaskId,
    onToggleStatus,
    onEdit,
    onDelete,
}) => {
    if (tasks.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3 className={styles.emptyStateTitle}>
                    No tasks found
                </h3>

                <p className={styles.emptyStateText}>
                    Try changing your filters or create a
                    new task.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.taskList}>
            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    expandedTaskId={expandedTaskId}
                    setExpandedTaskId={setExpandedTaskId}
                    onToggleStatus={onToggleStatus}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;