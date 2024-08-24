import { API_BASE_URL } from "@/data/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const usePostHiddenGems = () => {
  const token = localStorage.getItem("token");
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
      await axios.post(`${API_BASE_URL}/hidden-gems`, data, {
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
