import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

type PostReplyCommentRequest = {
  hidden_gems_id: string;
  comment: string;
  parent_id: string;
  token: string;
};

export const usePostReplyComment = () => {
  const postReplyComment = async (
    onSuccess: () => void,
    onError: () => void,
    data: PostReplyCommentRequest
  ) => {
    try {
      await axios.patch(
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
