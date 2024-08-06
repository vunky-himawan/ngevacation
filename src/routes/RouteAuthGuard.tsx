import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export const RouteAuthGuard = () => {
  const { token } = useAuth();

  if (!token) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};
