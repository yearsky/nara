/**
 * XP and leveling system utilities for Nara.ai
 */

export const XP_PER_LEVEL = 1000;

export interface XPCalculation {
  level: number;
  xpPoints: number;
  currentLevelXP: number;
  xpProgress: number; // 0-100 percentage
  xpToNextLevel: number;
}

/**
 * Calculate level and progress from total XP
 */
export function calculateXPProgress(totalXP: number): XPCalculation {
  const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  const currentLevelXP = totalXP % XP_PER_LEVEL;
  const xpProgress = (currentLevelXP / XP_PER_LEVEL) * 100;
  const xpToNextLevel = XP_PER_LEVEL - currentLevelXP;

  return {
    level,
    xpPoints: totalXP,
    currentLevelXP,
    xpProgress,
    xpToNextLevel,
  };
}

/**
 * Calculate XP needed to reach a specific level
 */
export function xpForLevel(level: number): number {
  return (level - 1) * XP_PER_LEVEL;
}

/**
 * Check if XP gain results in level up
 */
export function checkLevelUp(
  currentXP: number,
  xpGained: number
): { levelUp: boolean; newLevel: number; oldLevel: number } {
  const oldLevel = Math.floor(currentXP / XP_PER_LEVEL) + 1;
  const newLevel = Math.floor((currentXP + xpGained) / XP_PER_LEVEL) + 1;

  return {
    levelUp: newLevel > oldLevel,
    newLevel,
    oldLevel,
  };
}
