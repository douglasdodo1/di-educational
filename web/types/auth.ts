import type { User } from "./user";

export type AuthResponse = {
  login: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
};
