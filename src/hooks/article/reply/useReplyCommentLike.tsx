import { API_BASE_URL } from "@/data/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useReplyCommentLike = (
  articleId: string,
  parentId: string,
  token: string | undefined,
  replyId: string
) => {
  const navigate = useNavigate();

  const likeReply = async () => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      await axios.patch(
        `${API_BASE_URL}/article/${articleId}/comment/${parentId}/reply/${replyId}/like`,
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

  return likeReply;
};
