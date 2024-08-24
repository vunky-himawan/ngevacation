import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const RouteAuthGuard = () => {
  const { token, role } = useAuth();

  if (token && role === "admin") {
    return <Navigate to="/admin" />;
  }

  if (token && role === "traveler") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
