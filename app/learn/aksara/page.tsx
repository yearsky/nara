"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Play,
  CheckCircle,
  Lock,
  Star,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import SubmoduleHeader from "@/components/learn/SubmoduleHeader";
import GlassFooter from "@/components/learn/GlassFooter";
import QuizGamesFAB from "@/components/learn/QuizGamesFAB";
import { AksaraTour } from "@/components/learn/tours/AksaraTour";

const lessons = [
  {
    id: 1,
    title: "Pengenalan Aksara Jawa",
    description: "Dasar-dasar aksara Jawa dan sejarahnya",
    duration: "10 menit",
    isCompleted: true,
    isLocked: false,
    xp: 50,
  },
  {
    id: 2,
    title: "Huruf Vokal Aksara Jawa",
    description: "Belajar menulis dan membaca vokal",
    duration: "15 menit",
    isCompleted: true,
    isLocked: false,
    xp: 75,
  },
  {
    id: 3,
    title: "Huruf Konsonan Aksara Jawa",
    description: "Mengenal konsonan dalam aksara Jawa",
    duration: "20 menit",
    isCompleted: true,
    isLocked: false,
    xp: 100,
  },
  {
    id: 4,
    title: "Pasangan dan Sandhangan",
    description: "Aturan penulisan pasangan huruf",
    duration: "25 menit",
    isCompleted: true,
    isLocked: false,
    xp: 125,
  },
  {
    id: 5,
    title: "Latihan Menulis Kata Sederhana",
    description: "Praktik menulis kata-kata dasar",
    duration: "15 menit",
    isCompleted: false,
    isLocked: false,
    xp: 100,
  },
  {
    id: 6,
    title: "Membaca Kalimat Aksara Jawa",
    description: "Belajar membaca kalimat lengkap",
    duration: "20 menit",
    isCompleted: false,
    isLocked: false,
    xp: 150,
  },
  {
    id: 7,
    title: "Angka dalam Aksara Jawa",
    description: "Menulis dan membaca angka Jawa",
    duration: "10 menit",
    isCompleted: false,
    isLocked: false,
    xp: 75,
  },
  {
    id: 8,
    title: "Quiz Akhir Aksara Jawa",
    description: "Uji pemahaman aksara Jawa kamu",
    duration: "15 menit",
    isCompleted: false,
    isLocked: false,
    xp: 200,
  },
  {
    id: 9,
    title: "Pengenalan Aksara Bali",
    description: "Dasar-dasar aksara Bali",
    duration: "12 menit",
    isCompleted: false,
    isLocked: true,
    xp: 100,
  },
  {
    id: 10,
    title: "Aksara Sunda: Pengenalan",
    description: "Belajar aksara Sunda dari dasar",
    duration: "12 menit",
    isCompleted: false,
    isLocked: true,
    xp: 100,
  },
];

export default function AksaraPage() {
  const router = useRouter();
  const completedLessons = lessons.filter((l) => l.isCompleted).length;
  const totalLessons = lessons.length;
  const progress = Math.round((completedLessons / totalLessons) * 100);
  const totalXP = lessons.filter((l) => l.isCompleted).reduce((sum, l) => sum + l.xp, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-indigo-50/30 pb-32 pt-6">
      {/* Tour */}
      <AksaraTour />

      {/* Header */}
      <SubmoduleHeader
        title="Aksara Nusantara"
        subtitle="Pelajari 8+ aksara tradisional Indonesia"
        icon={BookOpen}
        gradientFrom="#3B82F6"
        gradientTo="#4F46E5"
      >
        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 progress-stats">
          <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-3 text-center border border-white/30">
            <div className="flex items-center justify-center gap-1 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs text-stone-600">Progress</span>
            </div>
            <p className="text-xl font-bold text-stone-900">{progress}%</p>
          </div>
          <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-3 text-center border border-white/30">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs text-stone-600">Selesai</span>
            </div>
            <p className="text-xl font-bold text-stone-900">
              {completedLessons}/{totalLessons}
            </p>
          </div>
          <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-3 text-center border border-white/30">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-xs text-stone-600">Total XP</span>
            </div>
            <p className="text-xl font-bold text-stone-900">{totalXP}</p>
          </div>
        </div>
      </SubmoduleHeader>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Module Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-stone-900 mb-3">
            Tentang Modul Ini
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Dalam modul ini, kamu akan mempelajari berbagai aksara tradisional
            Indonesia seperti Aksara Jawa, Bali, Sunda, Batak, dan lainnya.
            Setiap aksara memiliki keunikan dan sejarahnya sendiri yang akan
            kamu eksplorasi melalui pelajaran interaktif.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-primary" />
              <span>Dapat badge setelah selesai</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>875 XP total</span>
            </div>
          </div>
        </motion.div>

        {/* Lessons List */}
        <div className="space-y-3 lessons-list">
          <h2 className="text-xl font-bold text-stone-900 mb-4">
            Daftar Pelajaran
          </h2>

          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                disabled={lesson.isLocked}
                onClick={() => {
                  if (!lesson.isLocked) {
                    router.push(`/learn/aksara/lesson/${lesson.id}`);
                  }
                }}
                className={`w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 text-left ${
                  lesson.isLocked
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-[1.02]"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Lesson Number / Status Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                      lesson.isCompleted
                        ? "bg-green-100 text-green-600"
                        : lesson.isLocked
                        ? "bg-gray-100 text-gray-400"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {lesson.isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : lesson.isLocked ? (
                      <Lock className="w-6 h-6" />
                    ) : (
                      <span className="text-lg">{lesson.id}</span>
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-stone-900 mb-1">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {lesson.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>⏱️ {lesson.duration}</span>
                      <span>⭐ {lesson.xp} XP</span>
                    </div>
                  </div>

                  {/* Action Icon */}
                  {!lesson.isLocked && (
                    <div className="flex-shrink-0">
                      {lesson.isCompleted ? (
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Unlock Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">
                Pelajaran Terkunci
              </h3>
              <p className="text-sm text-amber-700">
                Selesaikan pelajaran sebelumnya untuk membuka aksara lainnya
                seperti Bali, Sunda, Batak, dan Bugis.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Glass Footer */}
      {/* Quiz & Games FAB */}
      <div className="quiz-games-fab">
        <QuizGamesFAB modulePath="/learn/aksara" />
      </div>

      <GlassFooter />
    </div>
  );
}
