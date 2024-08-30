import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type ArticlePayload = {
  title: string;
  content: string;
  cover: File;
  status: "DRAFT" | "PUBLISHED";
  tags: string[];
};

export const usePostArticle = () => {
  const axiosInstance = RefreshToken();

  const token: string | null = localStorage.getItem("X-Access-Token") || null;
  const postArticle = async (
    onSuccess: () => void,
    onError: () => void,
    payload: ArticlePayload
  ) => {
    try {
      if (!token) {
        throw new Error("Please login to post article");
      }

      await axiosInstance.post(`${API_BASE_URL}/article`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return postArticle;
};
