import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type DeleteMemberParams = {
  memberId: string;
  board_id: string;
  onSuccess: () => void;
  onError: () => void;
};

export const useDeleteMember = () => {
  const axios = RefreshToken();
  const deleteMember = async ({
    board_id,
    memberId,
    onSuccess,
    onError,
  }: DeleteMemberParams) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/board/${board_id}/member/${memberId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("X-Access-Token")}`,
          },
        }
      );

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return deleteMember;
};
