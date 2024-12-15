import { create } from 'zustand';

const enum UserRole {
  USER,
  PREMIUM,
  ADMIN,
}

interface User {
  name: string;
  lastName: string;
  email: string;
  role: UserRole;
}

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
