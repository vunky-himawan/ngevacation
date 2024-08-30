import { User } from "../User";
import { EventCategory } from "./EventCategory";
import { EventOperationalDay } from "./EventOperationalDay";

export type Event = {
  event_id: string;
  title: string;
  price_start: number;
  price_end: number;
  location: string;
  rating: number;
  category: EventCategory;
  status: string;
  description: string;
  photos: string[];
  user: User;
  operation_days: EventOperationalDay[];
  created_at: Date;
  updated_at: Date;
};
