import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

export const useUpdateEvent = () => {
  const { token } = useAuth();
  const axiosInstance = RefreshToken();

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

      await axiosInstance.patch(`${API_BASE_URL}/event/${eventId}`, data, {
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
