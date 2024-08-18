import { API_BASE_URL } from "@/data/api";
import { Event } from "@/types/Event/Event";
import axios from "axios";

export const useGetEvents = () => {
  const getEvents = async (
    onSuccess: (data: Event[]) => void,
    onError: () => void,
    token?: string,
    query?: string
  ) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const URL = `${API_BASE_URL}/event${query !== "" ? `?${query}` : ""}`;

    try {
      const response = await axios.get(URL, { headers });
      const events = response.data.data;
      onSuccess(events);
    } catch (error) {
      onError();
    }
  };

  return getEvents;
};
