import axios from "axios";

// Base API instance
const api = axios.create({
    baseURL: "http://localhost:5000/api"
});

// Request interceptor → JWT token yuborish
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // JWT token saqlanadi login paytida
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;