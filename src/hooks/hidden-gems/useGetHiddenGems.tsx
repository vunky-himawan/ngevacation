import { API_BASE_URL } from "@/data/api";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import axios from "axios";

export const useGetHiddenGems = () => {
  const getHiddenGems = async (
    onSuccess: (data: HiddenGem[]) => void,
    onError: () => void,
    query?: string
  ) => {
    try {
      const URL = `${API_BASE_URL}/hidden-gems${
        query !== "" ? `?${query}` : ""
      }`;
      const response = await axios.get(URL);
      const hiddenGems = response.data.data;
      onSuccess(hiddenGems);
    } catch (error) {
      onError();
    }
  };

  return getHiddenGems;
};
