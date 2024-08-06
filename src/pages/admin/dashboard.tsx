import { useAuth } from "@/context/authContext";

const DashboardAdmin = () => {
  const { token } = useAuth();
  return (
    <>
      <h1>Token: {token}</h1>
      <h1>Dashboard ADmin</h1>
    </>
  );
};

export default DashboardAdmin;
