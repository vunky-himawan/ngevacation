import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type PostCardProps = {
  onSuccess: () => void;
  onError: () => void;
  board_id: string;
  data: FormData;
};

export const usePostCard = () => {
  const axiosInstance = RefreshToken();

  const postCard = async ({
    onSuccess,
    onError,
    board_id,
    data,
  }: PostCardProps) => {
    try {
      await axiosInstance.post(`${API_BASE_URL}/board/${board_id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("X-Access-Token")}`,
        },
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return postCard;
};
