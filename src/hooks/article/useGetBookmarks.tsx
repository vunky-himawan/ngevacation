import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

export const useGetBookmarks = () => {
  const token = localStorage.getItem("X-Access-Token");
  const navigate = useNavigate();
  const axiosInstance = RefreshToken();

  const getBookmarks = async ({
    onSuccess,
    onError,
  }: {
    onSuccess?: (response: AxiosResponse) => void;
    onError?: () => void;
  }) => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/article/bookmark/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onSuccess) {
        onSuccess(response);
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
