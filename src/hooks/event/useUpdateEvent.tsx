import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

export const useUpdateEvent = () => {
  const { token } = useAuth();

  const updateEvent = async (
    onSuccess: () => void,
    onError: () => void,
    eventId: string,
    data: FormData
  ) => {
    try {
      if (!token) {
        throw new Error("Not logged in");
      }

      console.log(data);

      await axios.patch(`${API_BASE_URL}/event/${eventId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return updateEvent;
};
