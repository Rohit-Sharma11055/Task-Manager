import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../api/axios";
import styles from "../constants/styles";
import TaskHeader from "../components/TaskHeader";
import TaskStats from "../components/TaskStats";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import DeleteModal from "../components/DeleteModal";
import TaskPagination from "../components/TaskPagination";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        completed: 0,
    });

    const [filters, setFilters] = useState({
        search: "",
        status: "all",
        category: "all",
        priority: "all",
        page: 1,
    });

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        totalPages: 0,
        totalTasks: 0,
    });

    const [loading, setLoading] = useState(true);
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [deletingTaskId, setDeletingTaskId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchTasks = async () => {
        try {
            setLoading(true);

            const response = await api.get("/tasks", {
                params: {
                    search: filters.search,
                    status: filters.status,
                    category: filters.category,
                    priority: filters.priority,
                    page: filters.page,
                    limit: 12,
                },
            });

            setTasks(response.data.tasks);
            setStats(response.data.stats);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error(
                "Failed to fetch tasks:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (formData) => {
        try {
            const response = await api.post(
                "/tasks",
                formData
            );

            toast.success(response.data.message);

            setIsTaskModalOpen(false);

            setFilters((prev) => ({
                ...prev,
                page: 1,
            }));

            await fetchTasks();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to create task. Please try again."
            );

            throw error;
        }
    };

    const handleUpdateTask = async (formData) => {
        try {
            const response = await api.put(
                `/tasks/${editingTask._id}`,
                formData
            );

            toast.success(response.data.message);

            setEditingTask(null);

            await fetchTasks();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to update task. Please try again."
            );

            throw error;
        }
    };

    const confirmDelete = async () => {
        try {
            setDeleteLoading(true);

            const response = await api.delete(
                `/tasks/${deletingTaskId}`
            );

            toast.success(response.data.message);

            setDeletingTaskId(null);
            setExpandedTaskId(null);

            await fetchTasks();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to delete task. Please try again."
            );
        } finally {
            setDeleteLoading(false);
        }
    };


    //Handler Functions
    const handleAddTask = () => {
        setIsTaskModalOpen(true);
    };

    const handleToggleStatus = async (taskId) => {
        try {
            const response = await api.patch(
                `/tasks/${taskId}/status`
            );

            toast.success(response.data.message);

            setExpandedTaskId(null);

            await fetchTasks();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to update task. Please try again."
            );
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleDelete = (taskId) => {
        setDeletingTaskId(taskId);
    };


    useEffect(() => {
        fetchTasks();
    }, [
        filters.search,
        filters.status,
        filters.category,
        filters.priority,
        filters.page,
    ]);

    return (
        <div className={styles.dashboardPage}>
            <div className={styles.dashboardContainer}>
                <div className={styles.dashboardContent}>
                    <TaskHeader />

                    <TaskStats stats={stats} />

                    <TaskFilters
                        filters={filters}
                        setFilters={setFilters}
                        onAddTask={handleAddTask}
                    />

                    <TaskList
                        tasks={tasks}
                        expandedTaskId={expandedTaskId}
                        setExpandedTaskId={setExpandedTaskId}
                        onToggleStatus={handleToggleStatus}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    <TaskPagination
                        pagination={pagination}
                        setFilters={setFilters}
                    />

                    {isTaskModalOpen && (
                        <TaskModal
                            onClose={() => setIsTaskModalOpen(false)}
                            onSuccess={handleCreateTask}
                        />
                    )}

                    {editingTask && (
                        <TaskModal
                            task={editingTask}
                            onClose={() => setEditingTask(null)}
                            onSuccess={handleUpdateTask}
                        />
                    )}

                    {deletingTaskId && (
                        <DeleteModal
                            onClose={() => setDeletingTaskId(null)}
                            onConfirm={confirmDelete}
                            loading={deleteLoading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tasks;