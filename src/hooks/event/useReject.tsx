import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

type RejectProps = {
  onSuccess: () => void;
  onError: () => void;
  token: string;
  message: string;
  eventId: string;
};

export const useReject = () => {
  const reject = async ({
    onSuccess,
    onError,
    token,
    message,
    eventId,
  }: RejectProps) => {
    console.log(token);
    message = message.trim();

    try {
      await axios.patch(
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
