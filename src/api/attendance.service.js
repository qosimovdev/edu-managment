import api from "./axios";

export const getAttendance = async () => {
    const res = await api.get("/attendances");
    return res.data;
}

export const createAttendance = async (data) => {
    const res = await api.post("/attendances", data);
    return res.data;
}

export const updateAttendance = async (id, data) => {
    const res = await api.patch(`/attendances/${id}`, data);
    return res.data;
}

export const deleteAttendance = async (id) => {
    const res = await api.delete(`/attendances/${id}`);
    return res.data;
}

export const getAttendanceByGroup = async (groupId, date) => {
    const res = await api.get(`/attendances/group?groupId=${groupId}&date=${date}`);
    return res.data;
};

export const saveAttendance = async (data) => {
    const res = await api.post("/attendances/bulk", data);
    return res.data;
};