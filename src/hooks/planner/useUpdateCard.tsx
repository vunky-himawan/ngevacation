import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type UpdateCardProps = {
  onSuccess: () => void;
  onError: () => void;
  board_id: string;
  card_id: string;
  data: FormData;
};

export const useUpdateCard = () => {
  const axiosInstance = RefreshToken();

  const updateCard = async ({
    onSuccess,
    onError,
    data,
    board_id,
    card_id,
  }: UpdateCardProps) => {
    try {
      await axiosInstance.put(
        `${API_BASE_URL}/board/${board_id}/card/${card_id}`,
        data,
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

  return updateCard;
};
