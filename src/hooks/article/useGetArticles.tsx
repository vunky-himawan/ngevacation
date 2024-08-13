import { API_BASE_URL } from "@/data/api";
import { Article } from "@/types/Article";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

type Params = {
  search?: string;
  page?: number;
  userId?: string;
  status?: "DRAFT" | "PUBLISHED";
};

type UseGetArticlesResult = {
  articlesData: Array<Article>;
  isLoading: boolean;
  error: string | null;
};

export const useGetArticles = ({
  search = "",
  page = 1,
  userId = "",
  status = "PUBLISHED",
}: Params): UseGetArticlesResult => {
  const [articles, setArticles] = useState<Array<Article>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url =
      userId !== ""
        ? `${API_BASE_URL}/article?orderBy=updated_at&order=desc&page=${page}&limit=10&s=${search}&u=${userId}&stat[]=${status}`
        : `${API_BASE_URL}/article?orderBy=updated_at&order=desc&page=${page}&limit=10&s=${search}`;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
          headers,
        });
        setArticles(response.data.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
        } else {
          const errorMessage =
            err instanceof AxiosError ? err.message : "Unknown error occurred";
          setError(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();

    return () => {
      source.cancel();
    };
  }, [search, page, userId, status]);

  return {
    articlesData: articles,
    isLoading,
    error,
  };
};
