import { create } from "zustand";

interface CreditStore {
  credits: number;
  setCredits: (credits: number) => void;
  useCredit: (amount: number) => boolean;
  hasCredits: () => boolean;
  isLowCredits: () => boolean;
}

export const useCreditStore = create<CreditStore>((set, get) => ({
  credits: 10, // default credits
  setCredits: (credits) => set({ credits }),
  useCredit: (amount) => {
    const current = get().credits;
    if (current >= amount) {
      set({ credits: current - amount });
      return true;
    }
    return false;
  },
  hasCredits: () => get().credits > 0,
  isLowCredits: () => get().credits <= 3,
}));

