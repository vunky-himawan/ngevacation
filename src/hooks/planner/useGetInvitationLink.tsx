import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type InvitationLinkProps = {
  onSuccess: (link: string) => void;
  onError: () => void;
  board_id: string;
};

export const useGetInvitationLink = () => {
  const axios = RefreshToken();

  const getInvitationLink = async ({
    onSuccess,
    onError,
    board_id,
  }: InvitationLinkProps) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/board/${board_id}/link`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("X-Access-Token")}`,
          },
        }
      );

      const link = response.data.data.link;
      const url = `${window.location.origin}/planner/board/${link
        .split("/")
        .slice(5, 8)
        .join("/")}`;

      onSuccess(url);
    } catch (error) {
      onError();
    }
  };

  return getInvitationLink;
};
