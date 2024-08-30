import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

export const useGetTags = () => {
  const axiosInstance = RefreshToken();

  const getTags = async (
    onSuccess: (data: string[]) => void,
    onError: () => void
  ) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/article/tags`);

      onSuccess(response.data.data);
    } catch (error) {
      onError();
    }
  };

  return getTags;
};
