import { Toaster } from "./components/ui/toaster";
import AuthProvider from "./context/AuthContext";
import Router from "./routes/Route";

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
