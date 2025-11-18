"use client";

import { motion } from "framer-motion";

interface ProgressCardProps {
  streakDays: number;
  xpPoints: number;
  userLevel: number;
  xpProgress: number; // 0-100 percentage
  xpToNextLevel: number; // Remaining XP needed
}

export default function ProgressCard({
  streakDays,
  xpPoints,
  userLevel,
  xpProgress,
  xpToNextLevel,
}: ProgressCardProps) {
  return (
    <div className="max-w-md mx-auto px-4 mb-6">
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-3">
          {/* Streak Section */}
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label="Fire">
              🔥
            </span>
            <div>
              <p className="text-sm font-semibold text-stone-900">
                <motion.span
                  key={streakDays}
                  initial={{ scale: 1.2, color: "#F59E0B" }}
                  animate={{ scale: 1, color: "#1C1917" }}
                  transition={{ duration: 0.3 }}
                >
                  Streak {streakDays} hari!
                </motion.span>
              </p>
              <p className="text-xs text-stone-600">Pertahankan!</p>
            </div>
          </div>

          {/* XP Section */}
          <div className="text-right">
            <p className="text-lg font-bold text-brand-primary">{xpPoints} XP</p>
            <p className="text-xs text-stone-600">Level {userLevel}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="bg-stone-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full"
            />
          </div>
          <p className="text-xs text-stone-500 mt-1 text-right">
            {xpToNextLevel} XP ke Level {userLevel + 1}
          </p>
        </div>
      </div>
    </div>
  );
}
