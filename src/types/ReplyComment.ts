import { User } from "./User";

export type ReplyComment = {
  count_like: number;
  marked_like: boolean;
  reply_id: string;
  parent_id: string;
  comment: string;
  user: User;
  created_at: string;
  updated_at: string;
};
