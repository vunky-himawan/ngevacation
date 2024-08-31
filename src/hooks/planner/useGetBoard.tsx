import { API_BASE_URL } from "@/data/Api";
import { Board } from "@/types/Planner/PlannerBoard";
import { RefreshToken } from "@/utils/RefreshToken";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useGetBoard = () => {
  const axiosInstance = RefreshToken();
  const navigate = useNavigate();

  const getBoard = async (
    onSuccess: (data: Board) => void,
    onError: (message: string) => void,
    token: string,
    planId: string
  ) => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/board/${planId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSuccess(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.statusCode === 403) {
          navigate("/traveler/plans");
        } else {
          onError(error.response?.data.message);
        }
      }
    }
  };

  return getBoard;
};
