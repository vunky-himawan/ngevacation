import { User } from "../User";

export type HiddenGemsCommentReplies = {
  reply_id: string;
  parent_id: string;
  comment: string;
  rating: number;
  user: User;
  created_at: Date;
  updated_at: Date;
};
