import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type UpdateBoard = {
  onSuccess: () => void;
  onError: () => void;
  board_id: string;
  data: FormData;
};

export const useUpdateBoard = () => {
  const axios = RefreshToken();

  const updateBoard = async ({
    onSuccess,
    onError,
    data,
    board_id,
  }: UpdateBoard) => {
    try {
      await axios.put(`${API_BASE_URL}/board/${board_id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("X-Access-Token")}`,
        },
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return updateBoard;
};
