import { API_BASE_URL } from "@/data/Api";
import { Article } from "@/types/Article";
import { RefreshToken } from "@/utils/RefreshToken";
import axios from "axios";

export const useGetArticles = () => {
  const axiosInstance = RefreshToken();

  const getArtciles = async (
    onSuccess: (data: Article[]) => void,
    onError: () => void,
    query?: string,
    token?: string
  ) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const URL = `${API_BASE_URL}/article${query !== "" ? `?${query}` : ""}`;

      const response = token
        ? await axiosInstance.get(URL, { headers })
        : await axios.get(URL);
      const hiddenGems = response.data.data;
      onSuccess(hiddenGems);
    } catch (error) {
      onError();
    }
  };

  return getArtciles;
};
