import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

export const usePostEvent = () => {
  const { token } = useAuth();
  const axiosInstance = RefreshToken();

  const postEvent = async (
    onSuccess: () => void,
    onError: () => void,
    data: FormData
  ) => {
    try {
      if (!token) {
        throw new Error("Not logged in");
      }

      await axiosInstance.post(`${API_BASE_URL}/event`, data, {
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

  return postEvent;
};
