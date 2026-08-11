import { useAuth } from "../context/AuthContext";
import styles from "../constants/styles";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TaskHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully");
            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to logout. Please try again."
            );
        }
    };

    return (
        <header className={styles.taskHeader}>
            <div>
                <p className={styles.taskHeaderGreeting}>
                    Welcome back,
                </p>

                <h1 className={styles.taskHeaderTitle}>
                    {user?.name}
                </h1>
            </div>

            <button
                type="button"
                onClick={handleLogout}
                className={styles.secondaryButton}
            >
                Logout
            </button>
        </header>
    );
};

export default TaskHeader;