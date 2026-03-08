import api from "./axios";

export const getPayments = async () => {
    const res = await api.get("/payments");
    return res.data.payments;
}

export const createPayment = async (data) => {
    const res = await api.post("/payments", data);
    return res.data.payment;
}