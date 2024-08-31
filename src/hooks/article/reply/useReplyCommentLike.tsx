import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type CommentRequest = {
  articleId: string;
  parentId: string;
  replyId: string;
};

type LikeCommentParams = {
  onSuccess: () => void;
  onError: (message: string) => void;
  data: CommentRequest;
};

export const useReplyCommentLike = () => {
  const token = localStorage.getItem("X-Access-Token");
  const navigate = useNavigate();
  const axiosInstance = RefreshToken();

  const likeReply = async ({ onSuccess, onError, data }: LikeCommentParams) => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      await axiosInstance.patch(
        `${API_BASE_URL}/article/${data.articleId}/comment/${data.parentId}/reply/${data.replyId}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        onError(error.response?.data.message);
      }
    }
  };

  return likeReply;
};
