import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export const RouteAuthGuard = () => {
  const { token, role } = useAuth();

  if (!token) {
    return <Outlet />;
  }

  if (role === "traveler") {
    return <Navigate to="/" />;
  }

  return <Navigate to="/admin" />;
};
