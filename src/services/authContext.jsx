import { createContext, useContext, useState } from 'react';
import {jwtDecode} from "jwt-decode";
import createAxiosInstance from "./axiosInstance.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (token) => {
        localStorage.setItem('token', token);
        const user = jwtDecode(token);
        const axiosInstance = createAxiosInstance(true);
        axiosInstance.get(`user/${user.sub}`)
            .then((res) => {
                const data = res.data
                localStorage.setItem('user.email', data.email);
                localStorage.setItem('user.name', data.name);
                localStorage.setItem('user.department', data.department);
                localStorage.setItem('user.position', data.position);
            })
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user.email')
        localStorage.removeItem('user.name')
        localStorage.removeItem('user.department')
        localStorage.removeItem('user.position')
        setIsAuthenticated(false);
    };

    const contextValue = {
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
