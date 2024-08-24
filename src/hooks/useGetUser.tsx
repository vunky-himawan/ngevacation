import { API_BASE_URL } from "@/data/Api";
import { User } from "@/types/User";
import axios from "axios";

export const useGetUser = () => {
  const getUser = async (
    onSuccess: (data: User) => void,
    onError: () => void,
    token: string
  ) => {
    try {
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onSuccess(response.data.data);
    } catch (error) {
      onError();
    }
  };

  return getUser;
};
