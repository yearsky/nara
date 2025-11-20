"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, X } from "lucide-react";

interface QuizGamesFABProps {
  modulePath: string; // e.g., "/learn/map"
  showQuiz?: boolean;
  showGames?: boolean;
}

export default function QuizGamesFAB({
  modulePath,
  showQuiz = true,
  showGames = true
}: QuizGamesFABProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (!showQuiz && !showGames) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-3 space-y-2"
          >
            {showQuiz && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`${modulePath}/quiz?id=1`)}
                className="flex items-center gap-3 bg-white shadow-lg rounded-full px-5 py-3 text-purple-600 font-semibold hover:shadow-xl transition-all group"
              >
                <Trophy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Quiz</span>
              </motion.button>
            )}
            {showGames && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`${modulePath}/games`)}
                className="flex items-center gap-3 bg-white shadow-lg rounded-full px-5 py-3 text-emerald-600 font-semibold hover:shadow-xl transition-all group"
              >
                <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Games</span>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-gradient-to-br from-purple-600 to-emerald-600 hover:shadow-purple-500/50"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="relative"
            >
              <Trophy className="w-6 h-6 text-white absolute top-0 left-0 opacity-50" />
              <Gamepad2 className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
