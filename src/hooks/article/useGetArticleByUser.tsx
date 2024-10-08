import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { useNavigate } from "react-router-dom";

export const useArticleLike = (
  userId: string,
  token: string | undefined,
  search: string
) => {
  const navigate = useNavigate();
  const axiosInstance = RefreshToken();

  const getArticleByUser = async () => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      await axiosInstance.get(
        `${API_BASE_URL}/article?orderBy=updated_at&order=desc&page=1&limit=10&s=${search}&u=${userId}`,
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

  return getArticleByUser;
};
