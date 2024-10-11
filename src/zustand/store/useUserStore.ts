import { create } from "zustand";
import { UserState } from "~/interface/user.info";

export const useUserStore = create<UserState>((set) => ({
  first_name: null,
  last_name: null,
  email: null,
  password: null,
  profile_url: null,
  setUserDetails: (details) =>
    set((state) => ({
      ...state,
      ...details,
    })),
}));
