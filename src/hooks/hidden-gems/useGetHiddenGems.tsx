import { API_BASE_URL } from "@/data/Api";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import axios from "axios";

export const useGetHiddenGems = () => {
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

      const response = await axios.get(URL, { headers });

      const hiddenGems = response.data.data;
      onSuccess(hiddenGems);
    } catch (error) {
      onError();
    }
  };

  return getHiddenGems;
};
