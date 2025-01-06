import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// @ts-ignore
const RequireAuth = ({ allowedRoles }) => {
    // @ts-ignore
    const { auth } = useAuth();
    const location = useLocation();

    return (
        allowedRoles.includes(auth?.role)
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;