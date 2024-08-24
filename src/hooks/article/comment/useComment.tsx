import { API_BASE_URL } from "@/data/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type CommentRequest = {
  articleId: string;
  comment: string;
  token: string;
};

export const useCommmentArticle = () => {
  const navigate = useNavigate();
  const postComment = async (
    onSuccess: () => void,
    onError: () => void,
    data: CommentRequest
  ) => {
    try {
      if (!data.token) {
        navigate("/auth/login");
        return;
      }

      if (data.comment.trim() === "") {
        alert("Please enter a comment");
        return;
      }

      await axios.patch(
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
      onError();
    }
  };

  return postComment;
};
