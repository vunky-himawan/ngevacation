import Button from "@/components/Button";
import { Link } from "react-router-dom";

const Error = ({ code, message }: { code: number; message: string }) => {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen w-screen">
        <h1 className="text-3xl font-bold">Error {code}</h1>
        <p className="text-lg">{message}</p>
        <Link to={"/"}>
          <Button type="primary">Go Back Home</Button>
        </Link>
      </main>
    </>
  );
};

export default Error;
