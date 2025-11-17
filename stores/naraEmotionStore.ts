import { create } from "zustand";

type EmotionState = "neutral" | "happy" | "curious" | "encouraging" | "thinking";

interface NaraEmotionStore {
  emotion: EmotionState;
  isSpeaking: boolean;
  setEmotion: (emotion: EmotionState) => void;
  setIsSpeaking: (isSpeaking: boolean) => void;
  reactToUserProgress: (progress: number) => void;
}

export const useNaraEmotionStore = create<NaraEmotionStore>((set) => ({
  emotion: "neutral",
  isSpeaking: false,
  setEmotion: (emotion) => set({ emotion }),
  setIsSpeaking: (isSpeaking) => set({ isSpeaking }),
  reactToUserProgress: (progress) => {
    if (progress >= 80) {
      set({ emotion: "happy" });
    } else if (progress >= 50) {
      set({ emotion: "encouraging" });
    } else if (progress >= 20) {
      set({ emotion: "curious" });
    } else {
      set({ emotion: "neutral" });
    }
  },
}));

