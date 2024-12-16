import { create } from 'zustand';

export interface User {
  id: string;
  username: string;
  isPremium: boolean;
}

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
