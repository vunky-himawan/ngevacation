import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { useNavigate } from "react-router-dom";

export const useArticleBookmark = (articleId: string) => {
  const token = localStorage.getItem("X-Access-Token");
  const navigate = useNavigate();
  const axiosInstance = RefreshToken();

  const bookmarkArticle = async () => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      await axiosInstance.patch(
        `${API_BASE_URL}/article/${articleId}/bookmark`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to bookmark article:", error);
    }
  };

  return bookmarkArticle;
};
