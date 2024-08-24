import { API_BASE_URL } from "@/data/Api";
import { Article } from "@/types/Article";
import { Comment } from "@/types/Comment";
import axios from "axios";

interface ArticleDetail extends Article {
  count_views: number;
  count_likes: number;
  marked_bookmark: boolean;
  marked_like: boolean;
  comment: Array<Comment>;
}

export const useGetArticle = () => {
  const getArticle = async (
    onSuccess: (data: ArticleDetail) => void,
    onError: () => void,
    articleId: string,
    token?: string
  ) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const URL = `${API_BASE_URL}/article/${articleId}`;
      const response = await axios.get(URL, { headers });
      const article = response.data.data;
      onSuccess(article);
    } catch (error) {
      onError();
    }
  };

  return getArticle;
};