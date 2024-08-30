import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type ArticlePayload = {
  title: string;
  content: string;
  cover: File;
  status: "DRAFT" | "PUBLISHED";
  tags: string[];
};

export const useUpdateArticle = () => {
  const { token } = useAuth();
  const axiosInstance = RefreshToken();

  const updateArticle = async (
    onSuccess: () => void,
    onError: () => void,
    payload: ArticlePayload,
    articleId: string
  ) => {
    try {
      if (!token) {
        throw new Error("Not logged in");
      }

      await axiosInstance.patch(
        `${API_BASE_URL}/article/${articleId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return updateArticle;
};
