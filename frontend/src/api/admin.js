import axios from "axios";

const adminClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/admin",
})
adminClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

adminClient.interceptors.response.use(persistTokenFromResponse, (error) => {
    const token = response && response.data && response.data.token;
    if (token) {
        localStorage.setItem("adminToken");
    }
    return response
})

export default adminClient = (data) => adminClient.post("/admin/login", data);
export const getAdminDashboard = () => adminClient.get("/admin/dashboard");
export const updateWithdrawalStatus = (id, data) => adminClient.patch(`/admin/withdrawals/${id}`, data);