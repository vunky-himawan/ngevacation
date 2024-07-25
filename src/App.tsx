import AuthProvider from "./context/authContext";
import Router from "./routes/route";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
};

export default App;
