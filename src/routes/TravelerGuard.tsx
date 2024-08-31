import { useAuth } from "@/context/AuthContext";
import Error from "@/pages/Error";
import { Navigate, Outlet } from "react-router-dom";

export const TravelerGuard = () => {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  if (role !== "traveler") {
    return (
      <Error code={403} message="You are not authorized to access this page" />
    );
  }

  return <Outlet />;
};
