import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Error = ({ code, message }: { code: number; message: string }) => {
  const { role } = useAuth();

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen w-screen">
        <h1 className="text-3xl font-bold">Error {code}</h1>
        <p className="text-lg">{message}</p>
        <Link to={role === "admin" ? "/admin" : "/"}>
          <Button className="mt-4">Go to Home</Button>
        </Link>
      </main>
    </>
  );
};

export default Error;
