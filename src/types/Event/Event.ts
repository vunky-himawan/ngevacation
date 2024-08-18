import { User } from "../User";
import { OperationDay } from "./EventOperationalDay";

export type Event = {
  event_id: string;
  title: string;
  price_start: number;
  price_end: number;
  location: string;
  rating: number;
  category: any;
  status: string;
  description: string;
  photos: string[];
  user: User;
  operation_days: OperationDay[];
  created_at: Date;
  updated_at: Date;
};
