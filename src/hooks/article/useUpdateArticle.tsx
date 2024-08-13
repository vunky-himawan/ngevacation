import { API_BASE_URL } from "@/data/api";
import axios from "axios";

type ArticlePayload = {
  title: string;
  content: string;
  cover: File;
  status: "DRAFT" | "PUBLISHED";
  tags: string[];
};

type ArticleResponse = {
  title: string;
  status: "success" | "failed";
  message: string;
};

const UseUpdateArticle = async (
  { title, content, cover, tags, status }: ArticlePayload,
  articleId: string
): Promise<ArticleResponse> => {
  const token: string | null = localStorage.getItem("token") || null;

  if (!token) {
    return {
      title: title,
      status: "failed",
      message: "Please login to post article",
    };
  }

  const payload: ArticlePayload = {
    title: title,
    status: status,
    content: content,
    cover: cover,
    tags: tags,
  };

  try {
    await axios
      .patch(`${API_BASE_URL}/article/${articleId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        return {
          title: title,
          status: "success",
          message: "Article posted successfully",
        };
      });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message);
      return {
        title: title,
        status: "failed",
        message: error.response?.data.message,
      };
    }
  }

  return {
    title: title,
    status: "success",
    message: "Article posted successfully",
  };
};

export default UseUpdateArticle;
