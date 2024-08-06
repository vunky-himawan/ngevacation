import { API_BASE_URL } from "@/data/api";
import useGetUser from "@/hooks/useGetUser";
import { User } from "@/types/User";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({} as AuthContextType);

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (email: string, password: string) => Promise<void>;
  role: string;
  user: User | undefined;
  logout: () => Promise<void>;
  signUp: (
    fullname: string,
    username: string,
    email: string,
    password: string
  ) => Promise<boolean | undefined>;
};

interface JwtPayloadAuth extends JwtPayload {
  role: string;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const [role, setRole] = useState<string>("");
  const user: User | undefined = useGetUser();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const accessToken = response.data.data.access_token.token;

      if (response.data.data) {
        setToken(accessToken);
        localStorage.setItem("token", accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToken(null);
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      const decodeToken = jwtDecode<JwtPayloadAuth>(token);
      setRole(decodeToken.role === "ADMIN" ? "admin" : "traveler");
    }
  }, [token]);

  const signUp = async (
    fullname: string,
    username: string,
    email: string,
    password: string
  ): Promise<boolean | undefined> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        fullname,
        username,
        email,
        password,
      });

      if (response.data.statusCode === 201) {
        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data.message;
      } else {
        throw "An unexpected error occurred";
      }
    }
  };

  const context: AuthContextType = {
    token,
    setToken,
    login,
    role,
    user,
    logout,
    signUp,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
