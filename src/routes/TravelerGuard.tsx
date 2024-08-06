import { useAuth } from "@/context/authContext";
import { Link, Outlet } from "react-router-dom";

export const TravelerGuard = () => {
  const { token } = useAuth();

  if (!token) {
    return <Link to="/auth/login">Login</Link>;
  }

  return <Outlet />;
};
