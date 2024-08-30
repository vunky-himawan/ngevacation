import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type DeleteCardProps = {
  onSuccess: () => void;
  onError: () => void;
  board_id: string;
  card_id: string;
};

export const useDeleteCard = () => {
  const axiosInstance = RefreshToken();

  const deleteCard = async ({
    onSuccess,
    onError,
    board_id,
    card_id,
  }: DeleteCardProps) => {
    try {
      await axiosInstance.delete(
        `${API_BASE_URL}/board/${board_id}/card/${card_id}`,
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

  return deleteCard;
};
