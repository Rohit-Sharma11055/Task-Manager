import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import styles from "../constants/styles.js";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.email || !formData.password) {
            setError("Email and password are required.");
            return;
        }

        try {
            setLoading(true);

            await login(formData);

            navigate("/tasks");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <div className={styles.authHeader}>
                        <h1 className={styles.authTitle}>
                            Welcome Back
                        </h1>

                        <p className={styles.authSubtitle}>
                            Login to manage your tasks
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className={styles.form}
                    >
                        <div className={styles.fieldGroup}>
                            <label
                                htmlFor="email"
                                className={styles.label}
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label
                                htmlFor="password"
                                className={styles.label}
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        {error && (
                            <p className={styles.error}>
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.primaryButton}
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>
                    </form>

                    <div className={styles.authFooter}>
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className={styles.authLink}
                        >
                            Create one
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;