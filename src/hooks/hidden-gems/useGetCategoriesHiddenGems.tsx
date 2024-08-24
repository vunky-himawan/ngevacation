import { API_BASE_URL } from "@/data/Api";
import { HiddenGemsCategory } from "@/types/HiddenGemsCategory";
import axios from "axios";

export const useGetCategoriesHiddenGems = () => {
  const getCategoriesHiddenGems = async (
    onSuccess: (data: HiddenGemsCategory[]) => void,
    onError: () => void
  ) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/hidden-gems/categories`
      );

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      onError();
    }
  };

  return getCategoriesHiddenGems;
};
