import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { useNavigate } from "react-router-dom";

export const useDeleteArticle = (articleId: string) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("X-Access-Token");
  const axiosInstance = RefreshToken();

  const deleteArticle = async ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: () => void;
  }) => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      await axiosInstance.delete(`${API_BASE_URL}/article/${articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to delete the article:", error);

      if (onError) {
        onError();
      }
    }
  };

  return deleteArticle;
};
