import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

export const usePostEvent = () => {
  const { token } = useAuth();

  const postEvent = async (
    onSuccess: () => void,
    onError: () => void,
    data: FormData
  ) => {
    try {
      if (!token) {
        throw new Error("Not logged in");
      }

      const reponse = await axios.post(`${API_BASE_URL}/event`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(reponse);

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return postEvent;
};
