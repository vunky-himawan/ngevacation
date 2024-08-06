import { useAuth } from "@/context/authContext";

const DashboardTraveler = () => {
  const { token } = useAuth();
  return (
    <>
      <h1>Token: {token}</h1>
      <h1>Dashboard Traveler</h1>
    </>
  );
};

export default DashboardTraveler;
