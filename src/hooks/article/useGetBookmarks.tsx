import { API_BASE_URL } from "@/data/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useGetBookmarks = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getBookmarks = async ({
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
      const response = await axios.get(
        `${API_BASE_URL}/article/bookmark/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to get bookmarks:", error);

      if (onError) {
        onError();
      }
    }
  };

  return getBookmarks;
};
