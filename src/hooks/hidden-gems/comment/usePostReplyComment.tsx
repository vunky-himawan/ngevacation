import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type PostReplyCommentRequest = {
  hidden_gems_id: string;
  comment: string;
  parent_id: string;
  token: string;
};

export const usePostReplyComment = () => {
  const axiosInstance = RefreshToken();

  const postReplyComment = async (
    onSuccess: () => void,
    onError: () => void,
    data: PostReplyCommentRequest
  ) => {
    try {
      await axiosInstance.patch(
        `${API_BASE_URL}/hidden-gems/${data.hidden_gems_id}/comment/${data.parent_id}/reply`,
        {
          comment: data.comment,
        },
        {
          headers: { Authorization: `Bearer ${data.token}` },
        }
      );

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return postReplyComment;
};
