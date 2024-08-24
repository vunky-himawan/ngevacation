import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

type ArticlePayload = {
  title: string;
  content: string;
  cover: File;
  status: "DRAFT" | "PUBLISHED";
  tags: string[];
};

export const usePostArticle = () => {
  const token: string | null = localStorage.getItem("token") || null;
  const postArticle = async (
    onSuccess: () => void,
    onError: () => void,
    payload: ArticlePayload
  ) => {
    try {
      if (!token) {
        throw new Error("Please login to post article");
      }

      await axios.post(`${API_BASE_URL}/article`, payload, {
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
