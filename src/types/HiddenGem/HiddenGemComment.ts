import { HiddenGemsCommentReplies } from "./HiddenGemCommentReply";
import { User } from "../User";

export type HiddenGemsComment = {
  comment_id: string;
  comment: string;
  hidden_gems_id: string;
  rating: number;
  user: User;
  replies?: HiddenGemsCommentReplies[];
  created_at: Date;
  updated_at: Date;
}
