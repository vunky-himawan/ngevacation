import { API_BASE_URL } from "@/data/Api";
import { PlannnerTeam } from "@/types/Planner/PlannerTeam";
import { RefreshToken } from "@/utils/RefreshToken";

type GetTeamsProps = {
  onSuccess: (data: PlannnerTeam[]) => void;
  onError: () => void;
  board_id: string;
  query?: string;
};

export const useGetTeams = () => {
  const axios = RefreshToken();

  const getTeams = async ({
    onSuccess,
    onError,
    board_id,
    query,
  }: GetTeamsProps) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/board/${board_id}/team?username=${query}`
      );

      console.log(response);

      onSuccess(response.data.data);
    } catch (error) {
      onError();
    }
  };

  return getTeams;
};
