import { PlannnerMember } from "./PlannerMember";
import { PlannnerTaskList } from "./PlannerTaskList";

export type PlannnerCard = {
  card_id: string;
  board_id: string;
  cover: string | null;
  title: string;
  description: string;
  status: "TODO" | "DOING" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  tasklist: PlannnerTaskList[];
  member: PlannnerMember[];
  created_at: Date;
  updated_at: Date;
};
