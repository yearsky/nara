"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Star,
  CheckCircle,
  Trophy,
  Sparkles,
  Volume2,
  Image as ImageIcon,
  Award,
} from "lucide-react";
import { getLessonContent } from "@/lib/lessonData";
import { useUserStore } from "@/stores/userStore";
import GlassFooter from "@/components/learn/GlassFooter";
import Confetti from "react-confetti";

export default function LessonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { addXP } = useUserStore();

  const moduleId = params.module as string;
  const lessonId = parseInt(params.lessonId as string);

  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const lesson = getLessonContent(moduleId, lessonId);

  useEffect(() => {
    // Save as last active lesson
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "last-active-lesson",
        JSON.stringify({ moduleId, lessonId })
      );
    }

    // Load progress from localStorage
    if (typeof window !== "undefined") {
      const savedProgress = localStorage.getItem(
        `lesson-progress-${moduleId}-${lessonId}`
      );
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        setCompletedSections(progress.completedSections || []);
        setCurrentSection(progress.currentSection || 0);
      }
    }
  }, [moduleId, lessonId]);

  useEffect(() => {
    // Save progress to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `lesson-progress-${moduleId}-${lessonId}`,
        JSON.stringify({
          completedSections,
          currentSection,
        })
      );
    }
  }, [completedSections, currentSection, moduleId, lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">
            Pelajaran tidak ditemukan
          </h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const currentSectionData = lesson.sections[currentSection];
  const progress = Math.round(
    ((currentSection + 1) / lesson.sections.length) * 100
  );
  const isLastSection = currentSection === lesson.sections.length - 1;
  const isFirstSection = currentSection === 0;

  const handleNext = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }

    if (isLastSection) {
      // Mark lesson as completed
      handleCompleteLesson();
    } else {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (!isFirstSection) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCompleteLesson = () => {
    // Mark lesson as completed in localStorage
    if (typeof window !== "undefined") {
      const completedLessons = JSON.parse(
        localStorage.getItem("completed-lessons") || "{}"
      );
      if (!completedLessons[moduleId]) {
        completedLessons[moduleId] = [];
      }
      if (!completedLessons[moduleId].includes(lessonId)) {
        completedLessons[moduleId].push(lessonId);
        localStorage.setItem(
          "completed-lessons",
          JSON.stringify(completedLessons)
        );

        // Add XP
        addXP(lesson.xp);

        // Show celebration
        setShowConfetti(true);
        setShowCompletionModal(true);

        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
    }
  };

  const handleReturnToModule = () => {
    router.push(`/learn/${moduleId}`);
  };

  const handleNextLesson = () => {
    setShowCompletionModal(false);
    router.push(`/learn/${moduleId}/lesson/${lessonId + 1}`);
  };

  const handleTakeQuiz = () => {
    router.push(`/learn/${moduleId}/quiz`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-indigo-50/30 pb-32 pt-6">
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 300}
          height={typeof window !== "undefined" ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {/* Header */}
      <header className="sticky top-4 z-40 px-4 md:px-6 mb-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="backdrop-blur-xl bg-white/90 rounded-3xl shadow-xl border border-white/30 p-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {/* Top Row */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => router.push(`/learn/${moduleId}`)}
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:shadow-md transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm hidden sm:inline">
                  Kembali
                </span>
              </button>

              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-stone-900">{lesson.xp} XP</span>
              </div>
            </div>

            {/* Lesson Title */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-stone-600 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Lesson {lesson.id}</span>
                <span>•</span>
                <span>{lesson.duration}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-stone-900">
                {lesson.title}
              </h1>
              <p className="text-stone-600 mt-1">{lesson.description}</p>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-stone-600">
                <span>
                  Section {currentSection + 1} of {lesson.sections.length}
                </span>
                <span>{progress}% Complete</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6"
          >
            {/* Section Title */}
            {currentSectionData.title && (
              <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-3">
                {currentSectionData.type === "text" && (
                  <BookOpen className="w-6 h-6 text-blue-600" />
                )}
                {currentSectionData.type === "image" && (
                  <ImageIcon className="w-6 h-6 text-purple-600" />
                )}
                {currentSectionData.type === "video" && (
                  <Volume2 className="w-6 h-6 text-pink-600" />
                )}
                {currentSectionData.title}
              </h2>
            )}

            {/* Section Content */}
            <div className="prose prose-lg max-w-none">
              {currentSectionData.type === "text" && (
                <div className="text-stone-700 leading-relaxed whitespace-pre-line">
                  {currentSectionData.content}
                </div>
              )}

              {currentSectionData.type === "image" && (
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                    <p className="text-gray-500 ml-4">
                      [Image: {currentSectionData.imageCaption}]
                    </p>
                  </div>
                  {currentSectionData.imageCaption && (
                    <p className="text-sm text-stone-600 italic text-center">
                      {currentSectionData.imageCaption}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Mark as Complete Button for each section */}
            {!completedSections.includes(currentSection) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() =>
                    setCompletedSections([...completedSections, currentSection])
                  }
                  className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Tandai bagian ini sudah dibaca
                </button>
              </div>
            )}

            {completedSections.includes(currentSection) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                  <CheckCircle className="w-4 h-4 fill-current" />
                  Bagian ini sudah selesai dibaca
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Key Takeaways */}
        {isLastSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-6 mb-6"
          >
            <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Poin Penting
            </h3>
            <ul className="space-y-2">
              {lesson.keyTakeaways.map((takeaway, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-orange-900"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-600" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Vocabulary */}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Kosakata
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.vocabulary.map((vocab, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-purple-50 border border-purple-100"
                >
                  <div className="font-bold text-purple-900 mb-1">
                    {vocab.word}
                  </div>
                  <div className="text-sm text-purple-700">{vocab.meaning}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={handlePrevious}
            disabled={isFirstSection}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              isFirstSection
                ? "opacity-0 pointer-events-none"
                : "bg-gray-100 hover:bg-gray-200 text-stone-700 shadow-md hover:shadow-lg"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Sebelumnya
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
          >
            {isLastSection ? "Selesaikan Pelajaran" : "Lanjut"}
            {isLastSection ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </main>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCompletionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>
              </div>

              <h2 className="text-3xl font-bold text-stone-900 mb-3">
                Selamat! 🎉
              </h2>
              <p className="text-stone-600 mb-6">
                Kamu telah menyelesaikan pelajaran ini dengan baik!
              </p>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold text-yellow-900">
                    +{lesson.xp} XP
                  </span>
                </div>
                <p className="text-sm text-yellow-800">
                  XP berhasil ditambahkan!
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleNextLesson}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Lanjut ke Pelajaran Berikutnya
                </button>
                <button
                  onClick={handleTakeQuiz}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Ikuti Quiz
                </button>
                <button
                  onClick={handleReturnToModule}
                  className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-stone-700 rounded-full font-semibold transition-all"
                >
                  Kembali ke Modul
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <GlassFooter />
    </div>
  );
}
