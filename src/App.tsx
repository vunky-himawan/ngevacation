import { Toaster } from "./components/ui/toaster";
import AuthProvider from "./context/authContext";
import Router from "./routes/route";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
      <Toaster />
    </>
  );
};

export default App;
