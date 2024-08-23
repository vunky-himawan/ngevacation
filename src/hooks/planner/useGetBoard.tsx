import { API_BASE_URL } from "@/data/api";
import { Board } from "@/types/Planner/PlannerBoard";
import axios from "axios";

export const useGetBoard = () => {
  const getBoard = async (
    onSuccess: (data: Board) => void,
    onError: () => void,
    token: string,
    planId: string
  ) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/board/${planId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onSuccess(response.data.data);
    } catch (error) {
      onError();
    }
  };

  return getBoard;
};
