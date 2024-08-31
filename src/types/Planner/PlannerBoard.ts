import { User } from "../User";
import { PlannnerCard } from "./PlannerCard";
import { PlannnerTeam } from "./PlannerTeam";

export type Board = {
  board_id: string;
  title: string;
  User: User;
  created_at: Date;
  updated_at: Date;
  team: PlannnerTeam[];
  cover: string | null;
  kanban_card: PlannnerCard[];
};
