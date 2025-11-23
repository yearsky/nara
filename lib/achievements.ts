export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "learning" | "streak" | "social" | "special";
  xpReward: number;
  unlocked: boolean;
  progress?: number;
  target?: number;
  unlockedAt?: Date;
}

export const achievements: Achievement[] = [
  {
    id: "first-lesson",
    title: "Langkah Pertama",
    description: "Selesaikan pelajaran pertamamu",
    icon: "🎯",
    category: "learning",
    xpReward: 50,
    unlocked: false,
  },
  {
    id: "week-streak",
    title: "Konsisten!",
    description: "Pertahankan streak 7 hari berturut-turut",
    icon: "🔥",
    category: "streak",
    xpReward: 200,
    unlocked: false,
    progress: 0,
    target: 7,
  },
  {
    id: "aksara-master",
    title: "Master Aksara",
    description: "Selesaikan seluruh modul Aksara Nusantara",
    icon: "📚",
    category: "learning",
    xpReward: 500,
    unlocked: false,
  },
  {
    id: "story-reader",
    title: "Pembaca Setia",
    description: "Baca 10 cerita rakyat",
    icon: "📖",
    category: "learning",
    xpReward: 300,
    unlocked: false,
    progress: 0,
    target: 10,
  },
  {
    id: "quiz-perfect",
    title: "Sempurna!",
    description: "Dapatkan nilai 100% di quiz",
    icon: "⭐",
    category: "learning",
    xpReward: 150,
    unlocked: false,
  },
  {
    id: "level-5",
    title: "Rising Star",
    description: "Capai Level 5",
    icon: "🌟",
    category: "special",
    xpReward: 250,
    unlocked: false,
  },
  {
    id: "level-10",
    title: "Budaya Expert",
    description: "Capai Level 10",
    icon: "👑",
    category: "special",
    xpReward: 500,
    unlocked: false,
  },
  {
    id: "explorer",
    title: "Penjelajah",
    description: "Kunjungi 20 museum di Nara Map",
    icon: "🗺️",
    category: "learning",
    xpReward: 200,
    unlocked: false,
    progress: 0,
    target: 20,
  },
  {
    id: "music-lover",
    title: "Pecinta Musik",
    description: "Selesaikan modul Nara Symphony",
    icon: "🎵",
    category: "learning",
    xpReward: 400,
    unlocked: false,
  },
  {
    id: "early-bird",
    title: "Rajin Pagi",
    description: "Belajar sebelum jam 9 pagi sebanyak 5x",
    icon: "🌅",
    category: "streak",
    xpReward: 150,
    unlocked: false,
    progress: 0,
    target: 5,
  },
  {
    id: "night-owl",
    title: "Burung Malam",
    description: "Belajar setelah jam 9 malam sebanyak 5x",
    icon: "🦉",
    category: "streak",
    xpReward: 150,
    unlocked: false,
    progress: 0,
    target: 5,
  },
  {
    id: "all-modules",
    title: "Komplet!",
    description: "Selesaikan semua modul pembelajaran",
    icon: "🏆",
    category: "special",
    xpReward: 1000,
    unlocked: false,
  },
];

// Helper functions
export function checkAchievement(
  achievementId: string,
  userProgress: any
): boolean {
  const achievement = achievements.find((a) => a.id === achievementId);
  if (!achievement) return false;

  switch (achievementId) {
    case "first-lesson":
      return userProgress.completedLessons > 0;
    case "week-streak":
      return userProgress.streakDays >= 7;
    case "level-5":
      return userProgress.level >= 5;
    case "level-10":
      return userProgress.level >= 10;
    case "story-reader":
      return userProgress.storiesRead >= 10;
    // Add more conditions as needed
    default:
      return false;
  }
}

export function getUnlockedAchievements(
  userProgress: any
): Achievement[] {
  return achievements.filter((achievement) =>
    checkAchievement(achievement.id, userProgress)
  );
}

export function getAchievementProgress(
  achievementId: string,
  userProgress: any
): number {
  const achievement = achievements.find((a) => a.id === achievementId);
  if (!achievement || !achievement.target) return 0;

  switch (achievementId) {
    case "week-streak":
      return Math.min((userProgress.streakDays / 7) * 100, 100);
    case "story-reader":
      return Math.min((userProgress.storiesRead / 10) * 100, 100);
    case "explorer":
      return Math.min((userProgress.museumsVisited / 20) * 100, 100);
    default:
      return 0;
  }
}
