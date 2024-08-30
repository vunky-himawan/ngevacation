import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

export const useUpdateHiddenGem = () => {
  const axiosInstance = RefreshToken();
  const { token } = useAuth();

  const updateHiddenGem = async (
    onSuccess: () => void,
    onError: () => void,
    hiddenGemId: string,
    data: FormData
  ) => {
    try {
      if (!token) {
        throw new Error("Not logged in");
      }

      await axiosInstance.patch(
        `${API_BASE_URL}/hidden-gems/${hiddenGemId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return updateHiddenGem;
};
