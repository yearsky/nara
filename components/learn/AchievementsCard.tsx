"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Award, Zap } from "lucide-react";

const dailyAchievements = [
  {
    id: 1,
    title: "Belajar 15 Menit",
    description: "Selesaikan 1 pelajaran hari ini",
    icon: Target,
    progress: 60,
    goal: 100,
    reward: "+10 XP",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Jawab 10 Pertanyaan",
    description: "Jawab dengan benar minimal 10 soal",
    icon: Zap,
    progress: 70,
    goal: 100,
    reward: "+15 XP",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 3,
    title: "Perfect Score",
    description: "Dapatkan nilai 100 di satu quiz",
    icon: Award,
    progress: 0,
    goal: 100,
    reward: "+25 XP",
    color: "from-purple-500 to-pink-500",
  },
];

export default function AchievementsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-stone-900">
            Pencapaian Hari Ini
          </h3>
          <p className="text-sm text-gray-600">
            Selesaikan untuk dapat XP bonus!
          </p>
        </div>
      </div>

      {/* Achievement List */}
      <div className="space-y-4">
        {dailyAchievements.map((achievement, index) => {
          const AchievementIcon = achievement.icon;
          const isCompleted = achievement.progress >= achievement.goal;

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${achievement.color}`}
                >
                  <AchievementIcon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-stone-900">
                      {achievement.title}
                    </h4>
                    <span className="text-xs font-bold text-brand-primary bg-orange-50 px-2 py-1 rounded-full whitespace-nowrap">
                      {achievement.reward}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {achievement.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement.progress}%` }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.5 + index * 0.1,
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${achievement.color}`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {achievement.progress}%
                      </span>
                      {isCompleted && (
                        <span className="text-green-600 font-semibold">
                          ✓ Selesai!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Daily Reset Timer */}
      <div className="mt-5 pt-5 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Reset dalam <span className="font-semibold text-brand-primary">8 jam 32 menit</span>
        </p>
      </div>
    </motion.div>
  );
}
