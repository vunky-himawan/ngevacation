import { User } from "../User";

export type PlannnerTeam = {
  team_id: string;
  board_id: string;
  role: "ADMIN" | "MEMBER" | "OWNER";
  permissions: "EDIT" | "COMMENT" | "VIEW";
  user: User;
  created_at: Date;
  updated_at: Date;
};
