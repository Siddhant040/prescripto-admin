import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/admin/auth/hooks/useAuth";

const ProtectedRoutes = ({ children }) => {
    
    
    const { user , isCheckingAuth } = useAuth();
    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }

    if (!user) {
    return <Navigate to="/" replace />;
}

    return <>{children}</>
};

export default ProtectedRoutes;

