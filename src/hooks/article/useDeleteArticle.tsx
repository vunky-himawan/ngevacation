import { API_BASE_URL } from "@/data/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useDeleteArticle = (articleId: string) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
      await axios.delete(`${API_BASE_URL}/article/${articleId}`, {
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
