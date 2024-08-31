import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};
