import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import styles from "../constants/styles.js";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        const {
            name,
            email,
            password,
            confirmPassword,
        } = formData;

        if (
            !name ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await register(formData);

            navigate("/tasks");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Registration failed. Please try again."
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
                            Create Account
                        </h1>

                        <p className={styles.authSubtitle}>
                            Start organizing your tasks today
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className={styles.form}
                    >
                        <div className={styles.fieldGroup}>
                            <label
                                htmlFor="name"
                                className={styles.label}
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

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
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label
                                htmlFor="confirmPassword"
                                className={styles.label}
                            >
                                Confirm Password
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
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
                                ? "Creating account..."
                                : "Create Account"}
                        </button>
                    </form>

                    <div className={styles.authFooter}>
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className={styles.authLink}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;