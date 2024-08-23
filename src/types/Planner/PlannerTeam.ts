import { User } from "../User";

export type PlannnerTeam = {
  team_id: string;
  board_id: string;
  user: User;
  created_at: Date;
  updated_at: Date;
};
