import { API_BASE_URL } from "@/data/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useCommentLike = (
  articleId: string,
  commentId: string,
  token: string | undefined
) => {
  const navigate = useNavigate();

  const likeComment = async () => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      await axios.patch(
        `${API_BASE_URL}/article/${articleId}/comment/${commentId}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to like the article:", error);
    }
  };

  return likeComment;
};
