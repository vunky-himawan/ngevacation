import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

type ApproveProps = {
  onSuccess: () => void;
  onError: () => void;
  token: string;
  eventId: string;
};

export const useApprove = () => {
  const approve = async ({
    onSuccess,
    onError,
    token,
    eventId,
  }: ApproveProps) => {
    try {
      await axios.patch(`${API_BASE_URL}/event/${eventId}/approve`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return approve;
};
