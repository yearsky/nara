"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Star } from "lucide-react";

interface DailyAksaraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DailyAksaraModal({
  isOpen,
  onClose,
}: DailyAksaraModalProps) {
  // Sample daily aksara data
  const dailyAksara = {
    character: "ꦲ",
    name: "Ha",
    pronunciation: "ha",
    meaning: "Huruf pertama dalam aksara Jawa (Hanacaraka)",
    example: "ꦲꦤ (hana - ada)",
    tip: "Aksara 'Ha' adalah huruf pembuka dalam urutan aksara Jawa dan melambangkan awal dari segala sesuatu.",
  };

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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">
                Aksara Hari Ini
              </h2>
              <p className="text-stone-600 text-sm">
                Pelajari satu aksara setiap hari untuk memperkaya pengetahuanmu
              </p>
            </div>

            {/* Aksara Display */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-6 text-center">
              <div className="text-8xl font-serif mb-4 text-blue-900">
                {dailyAksara.character}
              </div>
              <h3 className="text-3xl font-bold text-blue-900 mb-2">
                {dailyAksara.name}
              </h3>
              <p className="text-blue-700 text-lg">/{dailyAksara.pronunciation}/</p>
            </div>

            {/* Info */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-semibold text-stone-900 mb-1 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Arti
                </h4>
                <p className="text-stone-700">{dailyAksara.meaning}</p>
              </div>

              <div>
                <h4 className="font-semibold text-stone-900 mb-1">Contoh</h4>
                <p className="text-stone-700 font-mono bg-gray-50 p-3 rounded-lg">
                  {dailyAksara.example}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-1">💡 Tips</h4>
                <p className="text-amber-800 text-sm">{dailyAksara.tip}</p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                onClose();
                window.location.href = "/learn/aksara";
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Pelajari Lebih Lanjut
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
