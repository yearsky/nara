import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { calculateXPProgress, XP_PER_LEVEL } from "@/lib/xp";

export interface UserStats {
  streakDays: number;
  xpPoints: number;
  level: number;
  xpProgress: number;
  xpToNextLevel: number;
  aksaraLearned: number;
  storiesRead: number;
  songsListened: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

interface UserState {
  user: User | null;
  stats: UserStats;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  updateStats: (stats: Partial<UserStats>) => void;
  incrementStreak: () => void;
  addXP: (amount: number) => void;
  resetError: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: {
        id: "demo-user",
        name: "Budi",
        avatar: "/images/avatar-placeholder.png",
        email: "budi@example.com",
      },
      stats: {
        streakDays: 7,
        xpPoints: 450,
        level: 1,
        xpProgress: 45,
        xpToNextLevel: 550,
        aksaraLearned: 3,
        storiesRead: 5,
        songsListened: 2,
      },
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),

      updateStats: (newStats) =>
        set((state) => ({
          stats: { ...state.stats, ...newStats },
        })),

      incrementStreak: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            streakDays: state.stats.streakDays + 1,
          },
        })),

      addXP: (amount) =>
        set((state) => {
          const newTotalXP = state.stats.xpPoints + amount;
          const newLevel = Math.floor(newTotalXP / XP_PER_LEVEL) + 1;
          const currentLevelXP = newTotalXP % XP_PER_LEVEL;
          const xpProgress = (currentLevelXP / XP_PER_LEVEL) * 100;
          const xpToNextLevel = XP_PER_LEVEL - currentLevelXP;

          // Trigger level up celebration if level increased
          if (newLevel > state.stats.level) {
            // Show confetti or modal
            console.log("Level Up!", newLevel);
            // TODO: Trigger level up animation/modal
          }

          return {
            stats: {
              ...state.stats,
              xpPoints: newTotalXP,
              level: newLevel,
              xpProgress,
              xpToNextLevel,
            },
          };
        }),

      resetError: () => set({ error: null }),
    }),
    {
      name: "nara-user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
