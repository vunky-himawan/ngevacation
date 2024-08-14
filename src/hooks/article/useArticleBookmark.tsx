import { API_BASE_URL } from "@/data/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useArticleBookmark = (articleId: string) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const bookmarkArticle = async () => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      await axios.patch(`${API_BASE_URL}/article/${articleId}/bookmark`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Failed to bookmark article:", error);
    }
  };

  return bookmarkArticle;
};
