import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const ProtectedRoutes = ({ children, requireRole }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Not logged in → go to login page
        if (!user) {
            navigate("/login");
            return;
        }

        // Role not allowed → redirect to unauthorized page
        if (!requireRole.includes(user.role)) {
            navigate("/unauthorized");
            return;
        }
    }, [user, navigate, requireRole]);

    // During redirect, avoid flashing UI components
    if (!user) return null;
    if (!requireRole.includes(user.role)) return null;

    return children;
};

export default ProtectedRoutes;
