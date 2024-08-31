import { useAuth } from "@/context/AuthContext";
import Error from "@/pages/Error";
import { Outlet } from "react-router-dom";

export const GuestTravelerGuard = () => {
  const { role } = useAuth();

  if (role === "admin") {
    return (
      <Error code={403} message="You are not authorized to access this page" />
    );
  }

  return <Outlet />;
};
