import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";
import { useNavigate } from "react-router-dom";

export const usePostHiddenGems = () => {
  const axiosInstance = RefreshToken();

  const token = localStorage.getItem("X-Access-Token");
  const navigate = useNavigate();

  if (!token) {
    navigate("/auth/login");
  }

  const postHiddenGem = async (
    onSuccess: () => void,
    onError: () => void,
    data: FormData
  ) => {
    try {
      await axiosInstance.post(`${API_BASE_URL}/hidden-gems`, data, {
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

  return postHiddenGem;
};
