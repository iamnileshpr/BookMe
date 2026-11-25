
import { Navigate, Routes, Route } from "react-router-dom";
import AdminDashboardPage from "./admin/adminDashboard";
import AdminLoginPage from "./admin/adminLoginPage";

const AdminProtectedRoute = ({ children }) => {
    const hasAdminToken = Boolean(localStorage.getItem("adminToken"));

    if (!hasAdminToken) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default function App() {
    return (
        <Routes>
            <Route
                path="/admin/login"
                element={<AdminLoginPage />}
            />

            <Route
                path="/admin/dashboard"
                element={
                    <AdminProtectedRoute>
                        <AdminDashboardPage />
                    </AdminProtectedRoute>
                }
            />

            {/* Redirect unknown routes to admin login */}
            <Route
                path="*"
                element={<Navigate to="/admin/login" replace />}
            />
        </Routes>
    );
}
