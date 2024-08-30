import { API_BASE_URL } from "@/data/Api";
import { useGetUser } from "@/hooks/useGetUser";
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
  user: User | null;
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
    localStorage.getItem("X-Access-Token") || null
  );
  const [role, setRole] = useState<string>("");
  const getUser = useGetUser();
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      const accessToken = response.data.data.access_token.token;
      const accessTokenExpiresIn = response.data.data.access_token.expires_in;
      const refreshToken = response.data.data.refresh_token.token;
      const refreshTokenExpiresIn = response.data.data.refresh_token.expires_in;

      if (response.data.data) {
        setToken(accessToken);
        localStorage.setItem("X-Access-Token", accessToken);
        localStorage.setItem(
          "X-Access-Token-Expires-In",
          new Date(accessTokenExpiresIn).getTime().toString() // Calculate the eFxpiration time
        );
        localStorage.setItem("X-Refresh-Token", refreshToken);
        localStorage.setItem(
          "X-Refresh-Token-Expires-In",
          new Date(refreshTokenExpiresIn).getTime().toString() // Calculate the expiration time
        );
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
      setRole("");
      setUser(null);
      localStorage.removeItem("X-Access-Token");
      localStorage.removeItem("X-Access-Token-Expires-In");
      localStorage.removeItem("X-Refresh-Token");
      localStorage.removeItem("X-Refresh-Token-Expires-In");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      const decodeToken = jwtDecode<JwtPayloadAuth>(token);
      setRole(decodeToken.role === "ADMIN" ? "admin" : "traveler");
      getUser(
        (data: User) => {
          setUser(data);
        },
        () => {
          console.log("error");
        },
        token as string
      );
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
