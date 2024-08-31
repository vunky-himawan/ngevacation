import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { useNavigate } from "react-router-dom";

export const useDeleteEvent = () => {
  const navigate = useNavigate();
  const axiosInstance = RefreshToken();

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
      await axiosInstance.delete(`${API_BASE_URL}/event/${eventId}`, {
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
