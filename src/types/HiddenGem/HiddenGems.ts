import { HiddenGemsComment } from "./HiddenGemComment";
import { HiddenGemsOperationDay } from "./HiddenGemOperationDay";
import { HiddenGemsCategory } from "../HiddenGemsCategory";
import { User } from "../User";

export type HiddenGem = {
  hidden_gem_id: string;
  title: string;
  price_start: number;
  price_end: number;
  isRated: boolean;
  location: string;
  rating: number;
  category: HiddenGemsCategory;
  status: string;
  description: string;
  photos: string[];
  user: User;
  operation_days: HiddenGemsOperationDay[];
  comment: HiddenGemsComment[];
  created_at: Date;
  updated_at: Date;
};
