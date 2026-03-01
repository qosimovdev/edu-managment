import api from "./axios";

export const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const getMe = async () => {
    const res = await api.get("/auth/me");
    return res.data;
};