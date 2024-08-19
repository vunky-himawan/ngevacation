import { API_BASE_URL } from "@/data/api";
import axios from "axios";

type ReplyCommentReplyRequest = {
  comment: string;
  hidden_gems_id: string;
  token: string;
  parent_id: string;
  comment_id: string;
};

export const usePostReplyCommentReply = () => {
  const postReplyCommentReply = async (
    onSuccess: () => void,
    onError: () => void,
    data: ReplyCommentReplyRequest
  ) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/hidden-gems/${data.hidden_gems_id}/comment/${data.comment_id}/reply/${data.parent_id}`,
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

  return postReplyCommentReply;
};
