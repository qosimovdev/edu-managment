import api from "./axios";

export const getStudents = async () => {
    const res = await api.get("/students");
    return res.data.students;
}

export const createStudent = async (data) => {
    const res = await api.post('/students', data);
    return res.data.student;
}

export const updateStudent = async (id, data) => {
    const res = await api.patch(`/students/${id}`, data);
    return res.data.student;
}

export const deleteStudent = async (id) => {
    const res = await api.delete(`/students/${id}`);
    return res.data;
}   