import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type DeleteBoardProps = {
  onSuccess: () => void;
  onError: () => void;
  boardId: string;
};

export const useDeleteBoard = () => {
  const axios = RefreshToken();
  const deleteBoard = async ({
    boardId,
    onSuccess,
    onError,
  }: DeleteBoardProps) => {
    try {
      await axios.delete(`${API_BASE_URL}/board/${boardId}`);

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return deleteBoard;
};
