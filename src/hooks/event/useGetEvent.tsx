import { API_BASE_URL } from "@/data/Api";
import { Event } from "@/types/Event/Event";
import axios from "axios";

export const useGetEvent = () => {
  const getEvent = async (
    eventId: string,
    onSuccess: (data: Event) => void,
    onError: () => void,
    token?: string
  ) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const URL = `${API_BASE_URL}/event/${eventId}`;

      const response = await axios.get(URL, { headers });
      const event = response.data.data;
      onSuccess(event);
    } catch (error) {
      onError();
    }
  };

  return getEvent;
};
