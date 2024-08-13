import { API_BASE_URL } from "@/data/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useComment = ({
  articleId,
  comment,
  token,
}: {
  articleId: string;
  comment: string;
  token: string;
}) => {
  const navigate = useNavigate();

  const sendComment = async () => {
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
        `${API_BASE_URL}/article/${articleId}/comment`,
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

  return sendComment;
};
