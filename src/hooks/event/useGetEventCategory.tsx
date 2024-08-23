import { API_BASE_URL } from "@/data/api";
import { EventCategory } from "@/types/Event/EventCategory";
import axios from "axios";

export const useGetEventCategory = () => {
  const getEventCategories = async (
    onSuccess: (data: EventCategory[]) => void,
    onError: () => void
  ) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/event/categories`);

      onSuccess(response.data.data);
    } catch (error) {
      onError();
    }
  };

  return getEventCategories;
};
