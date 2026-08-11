import styles from "../constants/styles";

const TaskStats = ({ stats }) => {
    const items = [
        {
            label: "Total Tasks",
            value: stats.total,
        },
        {
            label: "Pending",
            value: stats.pending,
        },
        {
            label: "Completed",
            value: stats.completed,
        },
    ];

    return (
        <div className={styles.taskStats}>
            {items.map((item) => (
                <div
                    key={item.label}
                    className={styles.taskStatCard}
                >
                    <p className={styles.taskStatLabel}>
                        {item.label}
                    </p>

                    <p className={styles.taskStatValue}>
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TaskStats;