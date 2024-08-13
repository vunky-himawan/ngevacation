import { API_BASE_URL } from "@/data/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useReplyCommentReplyTheReply = ({
  articleId,
  comment,
  token,
  parentId,
  commentId,
}: {
  articleId: string;
  comment: string;
  token: string;
  parentId: string;
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
        `${API_BASE_URL}/article/${articleId}/comment/${commentId}/reply/${parentId}`,
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
