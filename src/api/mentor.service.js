import api from "./axios";

export const getMentors = async () => {
    const res = await api.get("/mentors/list");
    return res.data;
}

export const createMentor = async (data) => {
    const res = await api.post("/mentors", data);
    return res.data;
}