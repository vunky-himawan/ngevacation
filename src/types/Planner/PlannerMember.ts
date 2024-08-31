import { PlannnerTeam } from "./PlannerTeam";

export type PlannnerMember = {
  member_id: string;
  team: PlannnerTeam;
  created_at: Date;
  updated_at: Date;
};
