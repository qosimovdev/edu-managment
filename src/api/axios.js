import axios from "axios";

// Base API 
const api = axios.create({
    baseURL: "http://localhost:5577/api",
    // baseURL: "https://edu-managment-backedn.railway.internal",
    "Content-Type": "application/json",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;