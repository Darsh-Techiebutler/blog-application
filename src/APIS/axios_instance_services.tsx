import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from "jwt-decode";

// API Base URL
const APP_API_URL = "http://localhost:1717/api";

// Utility: Get Token from LocalStorage
export const getCurrentAuth = () => {
    const localAuth = localStorage.getItem('token');
    return localAuth || null;
};

// // Decode JWT Token to Extract User Information
// export const getUserDataFromToken = () => {
//     const token = getCurrentAuth();
//     return token ? jwtDecode(token) : null;
// };

// Logout User
export const logout = () => {
    localStorage.removeItem('token');
};

// Axios Instance
const axiosInstance = axios.create({
    baseURL: APP_API_URL,
});

// Include Token in Request Headers
const getAuthHeaders = () => {
    const token = getCurrentAuth();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Axios Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const headers = getAuthHeaders();
        Object.entries(headers).forEach(([key, value]) => {
            config.headers.set(key, value);
        });
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
