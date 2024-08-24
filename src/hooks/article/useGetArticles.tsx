import { API_BASE_URL } from "@/data/Api";
import { Article } from "@/types/Article";
import axios from "axios";

export const useGetArticles = () => {
  const getArtciles = async (
    onSuccess: (data: Article[]) => void,
    onError: () => void,
    query?: string,
    token?: string
  ) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const URL = `${API_BASE_URL}/article${query !== "" ? `?${query}` : ""}`;

      console.log(query);

      const response = await axios.get(URL, { headers });
      const hiddenGems = response.data.data;
      onSuccess(hiddenGems);
    } catch (error) {
      onError();
    }
  };

  return getArtciles;
};
