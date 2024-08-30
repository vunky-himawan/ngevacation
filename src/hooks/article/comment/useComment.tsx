import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type CommentRequest = {
  articleId: string;
  comment: string;
  token: string;
};

type PostCommentParams = {
  onSuccess: () => void;
  onError: (message: string) => void;
  data: CommentRequest;
};

export const useCommentArticle = () => {
  const axiosInstance = RefreshToken();
  const navigate = useNavigate();
  const postComment = async ({
    onSuccess,
    onError,
    data,
  }: PostCommentParams) => {
    try {
      if (!data.token) {
        navigate("/auth/login");
        return;
      }

      if (data.comment.trim() === "") {
        alert("Please enter a comment");
        return;
      }

      await axiosInstance.patch(
        `${API_BASE_URL}/article/${data.articleId}/comment`,
        { comment: data.comment },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
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

  return postComment;
};
