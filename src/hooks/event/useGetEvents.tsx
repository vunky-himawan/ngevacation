import { API_BASE_URL } from "@/data/Api";
import { Event } from "@/types/Event/Event";
import { RefreshToken } from "@/utils/RefreshToken";
import axios from "axios";

export const useGetEvents = () => {
  const axiosInstance = RefreshToken();

  const getEvents = async (
    onSuccess: (data: Event[]) => void,
    onError: () => void,
    query?: string,
    token?: string
  ) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const URL = `${API_BASE_URL}/event${query !== "" ? `?${query}` : ""}`;

    try {
      const response = token
        ? await axiosInstance.get(URL, { headers })
        : await axios.get(URL);
      const events = response.data.data;
      onSuccess(events);
    } catch (error) {
      onError();
    }
  };

  return getEvents;
};
