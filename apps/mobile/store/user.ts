import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// interface UserRole {
// }

export interface User {
  id: string;
  username: string;
  role: boolean;
}

type UserState = {
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
