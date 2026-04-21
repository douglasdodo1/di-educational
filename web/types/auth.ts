import type { User } from "./user";

export type AuthResponse = {
  login: {
    user: User;
  };
};
