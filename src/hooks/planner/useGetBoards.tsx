import { API_BASE_URL } from "@/data/Api";
import { Board } from "@/types/Planner/PlannerBoard";
import { RefreshToken } from "@/utils/RefreshToken";

export const useGetBoards = () => {
  const axiosInstance = RefreshToken();

  const getBoards = async (
    onSuccess: (data: Board[]) => void,
    onError: () => void,
    token: string
  ) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/board`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      onSuccess(response.data.data);
    } catch (error) {
      onError();
    }
  };

  return getBoards;
};
