import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { AxiosError } from "axios";

type LeaveTeamParams = {
  onSuccess: () => void;
  onError: (message: string) => void;
  board_id: string;
};

export const useLeaveTeam = () => {
  const axios = RefreshToken();
  const leaveTeam = async ({
    board_id,
    onSuccess,
    onError,
  }: LeaveTeamParams) => {
    try {
      await axios.delete(`${API_BASE_URL}/board/${board_id}/member/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("X-Access-Token")}`,
        },
      });

      onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        onError(error.response?.data.message);
      }
    }
  };

  return leaveTeam;
};
