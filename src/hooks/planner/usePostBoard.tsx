import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type PostBoard = {
  onSuccess: () => void;
  onError: () => void;
  data: FormData;
};

export const usePostBoard = () => {
  const axios = RefreshToken();

  const postBoard = async ({ onSuccess, onError, data }: PostBoard) => {
    try {
      await axios.post(`${API_BASE_URL}/board`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return postBoard;
};
