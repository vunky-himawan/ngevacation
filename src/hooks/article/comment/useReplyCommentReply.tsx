import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type CommentRequest = {
  articleId: string;
  comment: string;
  commentId: string;
};

type PostReplyCommentParams = {
  onSuccess: () => void;
  onError: (message: string) => void;
  data: CommentRequest;
};

export const useReplyCommentReply = () => {
  const token = localStorage.getItem("X-Access-Token");
  const navigate = useNavigate();
  const axiosInstance = RefreshToken();

  const sendReplyComment = async ({
    onSuccess,
    onError,
    data,
  }: PostReplyCommentParams) => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    if (data.comment.trim() === "") {
      alert("Please enter a comment");
      return;
    }

    try {
      await axiosInstance.patch(
        `${API_BASE_URL}/article/${data.articleId}/comment/${data.commentId}/reply`,
        { comment: data.comment },
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

  return sendReplyComment;
};
