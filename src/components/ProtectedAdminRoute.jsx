import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = ({ isAdminAuthenticated }) => {
    if (!isAdminAuthenticated) {
        return <Navigate to="/admin-login" replace />;
    }
    return <Outlet />;
};

export default ProtectedAdminRoute;
