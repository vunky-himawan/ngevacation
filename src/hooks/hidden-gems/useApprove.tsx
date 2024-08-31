import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type ApproveProps = {
  onSuccess: () => void;
  onError: () => void;
  token: string;
  hiddenGemId: string;
};

export const useApprove = () => {
  const axiosInstance = RefreshToken();

  const approve = async ({
    onSuccess,
    onError,
    token,
    hiddenGemId,
  }: ApproveProps) => {
    try {
      await axiosInstance.patch(
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
