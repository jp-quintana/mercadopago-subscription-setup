import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PREMIUM = 'PREMIUM',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: 'user-store', storage: createJSONStorage(() => sessionStorage) }
  )
);
