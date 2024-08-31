import { Toaster } from "./components/ui/toaster";
import { Toaster as Sooner } from "./components/ui/sonner";
import AuthProvider from "./context/AuthContext";
import Router from "./routes/Route";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
      <Toaster />
      <Sooner />
    </>
  );
};

export default App;
