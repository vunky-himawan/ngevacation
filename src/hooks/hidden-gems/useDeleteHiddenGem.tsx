import { API_BASE_URL } from "@/data/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useDeleteHiddenGem = () => {
  const navigate = useNavigate();

  const deleteHiddenGem = async ({
    onSuccess,
    onError,
    hiddenGemId,
    token,
  }: {
    onSuccess: () => void;
    onError: () => void;
    hiddenGemId: string;
    token: string;
  }) => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/hidden-gems/${hiddenGemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return deleteHiddenGem;
};
