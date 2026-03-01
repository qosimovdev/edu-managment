import axios from "axios";

// Base API 
const api = axios.create({
    baseURL: "http://localhost:5577/api",
    "Content-Type": "application/json",
});

// Request interceptor → JWT token yuborish
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;