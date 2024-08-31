import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

type Logout = {
  onSuccess: () => void;
  onError: () => void;
  token: string;
};

export const useLogout = () => {
  const logout = async ({ onSuccess, onError, token }: Logout) => {
    try {
      await axios.delete(`${API_BASE_URL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return logout;
};
