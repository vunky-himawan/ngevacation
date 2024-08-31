import { Toaster } from "./components/ui/toaster";
import { Toaster as Sooner } from "./components/ui/sonner";
import Router from "./routes/Route";
import AuthProvider from "./context/AuthContext";

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
