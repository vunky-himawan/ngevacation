import { User } from "../User";

export type HiddenGemsCommentReplies = {
  reply_id: number;
  parent_id: number;
  comment: string;
  rating: number;
  user: User;
  created_at: Date;
  updated_at: Date;
};
