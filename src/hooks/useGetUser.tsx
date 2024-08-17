import { API_BASE_URL } from "@/data/api";
import { User } from "@/types/User";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useGetUser = (): User | undefined => {
  const [user, setUser] = useState<User | undefined>();
  const token: string | null = localStorage.getItem("token") || null;

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res: AxiosResponse) => {
          setUser(res.data.data);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    }
  }, [token]);

  return user;
};

export default useGetUser;
