import { ReplyComment } from "./ReplyComment";
import { User } from "./User";

export type Comment = {
  marked_like: boolean;
  count_like: number;
  comment_id: string;
  comment: string;
  user: User;
  replies: Array<ReplyComment>;
  created_at: string;
  updated_at: string;
};
