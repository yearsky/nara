"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Target, Clock, Award } from "lucide-react";

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DailyChallengeModal({
  isOpen,
  onClose,
}: DailyChallengeModalProps) {
  const challenges = [
    {
      id: 1,
      title: "Baca 3 Cerita Rakyat",
      description: "Selesaikan membaca 3 cerita dari Nara Verse",
      progress: 1,
      target: 3,
      xp: 150,
      icon: "📖",
      completed: false,
    },
    {
      id: 2,
      title: "Perfect Quiz Score",
      description: "Dapatkan nilai 100% di quiz apapun",
      progress: 0,
      target: 1,
      xp: 200,
      icon: "🎯",
      completed: false,
    },
    {
      id: 3,
      title: "Belajar 10 Menit",
      description: "Luangkan minimal 10 menit untuk belajar hari ini",
      progress: 5,
      target: 10,
      xp: 100,
      icon: "⏱️",
      completed: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-stone-600" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">
                Challenge Harian
              </h2>
              <p className="text-stone-600 text-sm">
                Selesaikan challenge untuk mendapatkan bonus XP!
              </p>
            </div>

            {/* Challenges List */}
            <div className="space-y-4 mb-6">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl">{challenge.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-stone-900 mb-1">
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-stone-600">
                        {challenge.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-bold text-yellow-900">
                        {challenge.xp} XP
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-600">
                      <span>Progress</span>
                      <span>
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all"
                        style={{
                          width: `${
                            (challenge.progress / challenge.target) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center mb-6">
              <p className="text-sm text-blue-900">
                <span className="font-bold">💡 Tip:</span> Challenge baru
                tersedia setiap hari. Jangan sampai terlewat!
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Mulai Challenge
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
