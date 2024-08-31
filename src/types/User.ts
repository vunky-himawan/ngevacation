export type User = {
  user_id: string;
  email: string;
  fullname: string;
  username: string;
  profile: string;
  updated_at: Date;
  created_at: Date;
  role: "ADMIN" | "MEMBER";
};
