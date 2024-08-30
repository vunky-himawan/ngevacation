import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type JoinBoardProps = {
  onSuccess: () => void;
  onError: (message: string) => void;
  boardId: string;
  hash: string;
};

export const useJoinBoard = () => {
  const axios = RefreshToken();
  const navigate = useNavigate();
  const joinBoard = async ({
    onSuccess,
    onError,
    boardId,
    hash,
  }: JoinBoardProps) => {
    try {
      const token = localStorage.getItem("X-Access-Token");

      if (!token) {
        navigate("/auth/login");
      }

      await axios.post(`${API_BASE_URL}/board/${boardId}/join/${hash}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        onError(error.response?.data.message);
      }
    }
  };

  return joinBoard;
};
