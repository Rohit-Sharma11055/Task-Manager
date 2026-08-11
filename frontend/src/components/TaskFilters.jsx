import styles from "../constants/styles";

const TaskFilters = ({
    filters,
    setFilters,
    onAddTask,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value,
            page: 1,
        }));
    };

    return (
        <div className={styles.taskFilters}>
            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleChange}
                    placeholder="Search tasks..."
                    className={styles.searchInput}
                />
            </div>

            <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className={styles.filterSelect}
            >
                <option className={styles.inputOption} value="all">All Status</option>
                <option className={styles.inputOption} value="pending">Pending</option>
                <option className={styles.inputOption} value="completed">
                    Completed
                </option>
            </select>

            <select
                name="category"
                value={filters.category}
                onChange={handleChange}
                className={styles.filterSelect}
            >
                <option className={styles.inputOption} value="all">All Categories</option>
                <option className={styles.inputOption} value="Work">Work</option>
                <option className={styles.inputOption} value="Study">Study</option>
                <option className={styles.inputOption} value="Personal">Personal</option>
                <option className={styles.inputOption} value="Health">Health</option>
                <option className={styles.inputOption} value="Finance">Finance</option>
                <option className={styles.inputOption} value="Other">Other</option>
            </select>

            <select
                name="priority"
                value={filters.priority}
                onChange={handleChange}
                className={styles.filterSelect}
            >
                <option className={styles.inputOption} value="all">All Priorities</option>
                <option className={styles.inputOption} value="Low">Low</option>
                <option className={styles.inputOption} value="Medium">Medium</option>
                <option className={styles.inputOption} value="High">High</option>
            </select>

            <button
                type="button"
                onClick={onAddTask}
                className={styles.primaryButton}
            >
                + Add Task
            </button>
        </div>
    );
};

export default TaskFilters;