import { API_BASE_URL } from "@/data/Api";
import { Event } from "@/types/Event/Event";
import { RefreshToken } from "@/utils/RefreshToken";
import axios from "axios";

export const useGetEvent = () => {
  const axiosInstance = RefreshToken();

  const getEvent = async (
    eventId: string,
    onSuccess: (data: Event) => void,
    onError: () => void,
    token?: string
  ) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const URL = `${API_BASE_URL}/event/${eventId}`;

      const response = token
        ? await axiosInstance.get(URL, { headers })
        : await axios.get(URL);
      const event = response.data.data;
      onSuccess(event);
    } catch (error) {
      onError();
    }
  };

  return getEvent;
};
