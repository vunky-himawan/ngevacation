import { User } from "./User";

export type Article = {
  article_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  tag: Array<string>;
  title: string;
  cover: string;
  user: User;
  count_views: number;
  count_comments: number;
  count_likes: number;
  count_bookmarks: number;
};
