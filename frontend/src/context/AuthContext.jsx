import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await api.get("/auth/me");

            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const register = async (userData) => {
        const response = await api.post(
            "/auth/register",
            userData
        );

        setUser(response.data.user);

        return response.data;
    };

    const login = async (credentials) => {
        const response = await api.post(
            "/auth/login",
            credentials
        );

        setUser(response.data.user);

        return response.data;
    };

    const logout = async () => {
        await api.post("/auth/logout");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};