import axios from "axios";

const adminClient = axios.create({
    baseURL: "http://localhost:5000/api/admin",
    headers: {
        "Content-Type": "application/json",
    },
});

adminClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const adminLogin = (data) => {
    const jsonData = JSON.stringify({
        email: data.email,
        password: data.password
    });

    console.log("FINAL JSON:", jsonData);

    return adminClient.post("/login", jsonData);
};

export const getAdminDashboard = async() => {
    const { data } = await adminClient.get("/dashboard");
    return data;
};

export const updateWithdrawalStatus = (id, data) =>
    adminClient.patch(`/withdrawals/${id}/status`, data);

export default adminClient;