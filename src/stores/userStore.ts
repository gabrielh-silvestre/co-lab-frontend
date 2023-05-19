import { create } from 'zustand';

type UserStore = {
  token: string | null;
  setToken: (token: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  token: null,
  setToken: (token: string) => set({ token })
}));
