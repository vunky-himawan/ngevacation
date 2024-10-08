import { API_BASE_URL } from "@/data/Api";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import { RefreshToken } from "@/utils/RefreshToken";
import axios from "axios";

export const useGetHiddenGemById = () => {
  const axiosInstance = RefreshToken();

  const getHiddenGemById = async (
    hiddenGemId: string,
    onSuccess: (data: HiddenGem) => void,
    onError: () => void,
    token?: string
  ) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const URL = `${API_BASE_URL}/hidden-gems/${hiddenGemId}`;

      const response = token
        ? await axiosInstance.get(URL, { headers })
        : await axios.get(URL);
      const hiddenGem = response.data.data;
      onSuccess(hiddenGem);
    } catch (error) {
      onError();
    }
  };

  return getHiddenGemById;
};
