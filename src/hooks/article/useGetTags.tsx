import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

export const useGetTags = () => {
  const getTags = async (
    onSuccess: (data: string[]) => void,
    onError: () => void
  ) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/article/tags`);

      onSuccess(response.data.data);
    } catch (error) {
      onError();
    }
  };

  return getTags;
};
