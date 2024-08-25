import { API_BASE_URL } from "@/data/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useDeleteEvent = () => {
  const navigate = useNavigate();

  const deleteEvent = async ({
    onSuccess,
    onError,
    eventId,
    token,
  }: {
    onSuccess: () => void;
    onError: () => void;
    eventId: string;
    token: string;
  }) => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return deleteEvent;
};
