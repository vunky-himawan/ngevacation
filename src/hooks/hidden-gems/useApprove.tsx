import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

type ApproveProps = {
  onSuccess: () => void;
  onError: () => void;
  token: string;
  hiddenGemId: string;
};

export const useApprove = () => {
  const approve = async ({
    onSuccess,
    onError,
    token,
    hiddenGemId,
  }: ApproveProps) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/hidden-gems/${hiddenGemId}/approve`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return approve;
};
