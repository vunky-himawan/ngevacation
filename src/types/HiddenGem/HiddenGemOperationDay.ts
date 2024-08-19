export type HiddenGemsOperationDay = {
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  open_time: string;
  close_time: string;
  hidden_gem_id: string;
  operation_id: string;
  updated_at: string;
  created_at: string;
};
