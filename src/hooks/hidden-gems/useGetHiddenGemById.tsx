import { API_BASE_URL } from "@/data/Api";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import axios from "axios";

export const useGetHiddenGemById = () => {
  const getHiddenGemById = async (
    hiddenGemId: string,
    onSuccess: (data: HiddenGem) => void,
    onError: () => void,
    token?: string
  ) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      console.log(hiddenGemId);

      const URL = `${API_BASE_URL}/hidden-gems/${hiddenGemId}`;

      const response = await axios.get(URL, { headers });
      const hiddenGem = response.data.data;
      onSuccess(hiddenGem);
    } catch (error) {
      onError();
    }
  };

  return getHiddenGemById;
};
