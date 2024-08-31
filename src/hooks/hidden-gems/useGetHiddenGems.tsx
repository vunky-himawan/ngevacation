import { API_BASE_URL } from "@/data/Api";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import { RefreshToken } from "@/utils/RefreshToken";
import axios from "axios";

export const useGetHiddenGems = () => {
  const axiosInstance = RefreshToken();

  const getHiddenGems = async (
    onSuccess: (data: HiddenGem[]) => void,
    onError: () => void,
    query?: string,
    token?: string
  ) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const URL = `${API_BASE_URL}/hidden-gems${
        query !== "" ? `?${query}` : ""
      }`;

      const response = token
        ? await axiosInstance.get(URL, { headers })
        : await axios.get(URL);

      const hiddenGems = response.data.data;
      onSuccess(hiddenGems);
    } catch (error) {
      onError();
    }
  };

  return getHiddenGems;
};
