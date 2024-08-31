import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { useNavigate } from "react-router-dom";

export const useArticleLike = (
  articleId: string,
  token: string | undefined
) => {
  const navigate = useNavigate();
  const axiosInstance = RefreshToken();

  const likeArticle = async () => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      await axiosInstance.patch(
        `${API_BASE_URL}/article/${articleId}/like`,
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

  return likeArticle;
};
