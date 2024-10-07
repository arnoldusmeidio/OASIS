import { User } from "@/types";
import { create } from "zustand";

interface UserStore {
   user: User | null;
   setUser: (user: User | null) => void;
   clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
   user: null,
   setUser: (user) => set(() => ({ user })),
   clearUser: () => set({ user: null }),
}));
