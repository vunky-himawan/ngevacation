import { API_BASE_URL } from "@/data/Api";
import { RefreshToken } from "@/utils/RefreshToken";

type PostCommentRequest = {
  comment: string;
  hidden_gems_id: string;
  token: string;
  rating: number;
};

export const usePostComment = () => {
  const axiosInstance = RefreshToken();

  const postComment = async (
    onSuccess: () => void,
    onError: () => void,
    data: PostCommentRequest
  ) => {
    try {
      await axiosInstance.patch(
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
