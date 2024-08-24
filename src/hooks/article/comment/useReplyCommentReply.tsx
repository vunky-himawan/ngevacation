import { API_BASE_URL } from "@/data/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useReplyCommentReply = ({
  articleId,
  comment,
  token,
  commentId,
}: {
  articleId: string;
  comment: string;
  token: string;
  commentId: string;
}) => {
  const navigate = useNavigate();

  const sendReplyComment = async () => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    if (comment.trim() === "") {
      alert("Please enter a comment");
      return;
    }

    try {
      await axios.patch(
        `${API_BASE_URL}/article/${articleId}/comment/${commentId}/reply`,
        { comment: comment },
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

  return sendReplyComment;
};
