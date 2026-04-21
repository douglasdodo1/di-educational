import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearAuth: () => set({ user: null }),
}));
