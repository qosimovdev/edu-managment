import api from "./axios";

export const getGroups = async () => {
    const res = await api.get("/groups");
    return res.data;
}

export const createGroup = async (data) => {
    const res = await api.post("/groups", data);
    return res.data;
}

export const updateGroup = async (id, data) => {
    const res = await api.patch(`/groups/${id}`, data);
    return res.data;
}

export const deleteGroup = async (id) => {
    const res = await api.delete(`/groups/${id}`);
    return res.data;
}