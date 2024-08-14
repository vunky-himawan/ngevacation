import { API_BASE_URL } from "@/data/api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useGetTags = (): string[] | undefined => {
  const [tags, setTags] = useState<string[] | undefined>();
  const token: string | null = localStorage.getItem("token") || null;

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_BASE_URL}/article/tags`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: AxiosResponse) => {
          setTags(res.data.data);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    }
  }, [token]);

  return tags;
};

export default useGetTags;
