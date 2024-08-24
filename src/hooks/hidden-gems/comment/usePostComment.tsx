import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

type PostCommentRequest = {
  comment: string;
  hidden_gems_id: string;
  token: string;
  rating: number;
};

export const usePostComment = () => {
  const postComment = async (
    onSuccess: () => void,
    onError: () => void,
    data: PostCommentRequest
  ) => {
    try {
      // if (data.rating < 1) {
      //   throw new Error("Rating must be greater than 1");
      // }

      await axios.patch(
        `${API_BASE_URL}/hidden-gems/${data.hidden_gems_id}/comment`,
        { comment: data.comment, rating: data.rating },
        { headers: { Authorization: `Bearer ${data.token}` } }
      );

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return postComment;
};
