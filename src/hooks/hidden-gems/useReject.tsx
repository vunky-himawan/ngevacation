import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type RejectProps = {
  onSuccess: () => void;
  onError: () => void;
  token: string;
  message: string;
  hiddenGemId: string;
};

export const useReject = () => {
  const axiosInstance = RefreshToken();

  const reject = async ({
    onSuccess,
    onError,
    token,
    message,
    hiddenGemId,
  }: RejectProps) => {
    message = message.trim();

    try {
      await axiosInstance.patch(
        `${API_BASE_URL}/hidden-gems/${hiddenGemId}/reject`,
        {
          message: message,
        },
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

  return reject;
};
