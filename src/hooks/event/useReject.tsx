import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type RejectProps = {
  onSuccess: () => void;
  onError: () => void;
  token: string;
  message: string;
  eventId: string;
};

export const useReject = () => {
  const axiosInstance = RefreshToken();

  const reject = async ({
    onSuccess,
    onError,
    token,
    message,
    eventId,
  }: RejectProps) => {
    message = message.trim();

    try {
      await axiosInstance.patch(
        `${API_BASE_URL}/event/${eventId}/reject`,
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
