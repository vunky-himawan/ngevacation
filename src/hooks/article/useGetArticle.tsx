import { API_BASE_URL } from "@/data/api";
import { Article } from "@/types/Article";
import { Comment } from "@/types/Comment";
import axios from "axios";
import { useEffect, useState } from "react";

interface ArticleDetail extends Article {
  count_views: number;
  count_likes: number;
  marked_bookmark: boolean;
  marked_like: boolean;
  comment: Array<Comment>;
}

export const useGetArticle = ({
  articleId,
  withInterval = true,
}: {
  articleId: string;
  withInterval?: boolean;
}): ArticleDetail | null => {
  const token: string | null = localStorage.getItem("token") || null;
  const [article, setArticle] = useState<ArticleDetail | null>(null);

  useEffect(() => {
    const fetchArticle = () => {
      axios
        .get(
          `${API_BASE_URL}/article/${articleId}`,
          token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        )
        .then((res) => {
          setArticle(res.data.data);
        });
    };

    fetchArticle(); // Fetch immediately on mount

    if (withInterval) {
      const interval = setInterval(() => {
        fetchArticle();
      }, 5000); // Fetch every 5 seconds

      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [token, articleId]);

  return article;
};
