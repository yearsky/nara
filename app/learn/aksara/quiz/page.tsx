"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Award,
  BookOpen,
  Lightbulb,
  Star,
  Trophy,
} from "lucide-react";
import {
  getAksaraQuizById,
  calculateScore,
  getGradeFromScore,
  aksara_Question,
} from "@/lib/aksaraQuizData";
import SubmoduleHeader from "@/components/learn/SubmoduleHeader";
import NaraAssistant from "@/components/learn/NaraAssistant";
import {
  ConfettiCelebration,
  PerfectScoreCelebration,
} from "@/components/learn/ConfettiCelebration";

type AnswerState = {
  questionId: number;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  showExplanation: boolean;
};

export default function AksaraQuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = parseInt(searchParams.get("id") || "1");

  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const quizData = getAksaraQuizById(quizId);

    if (quizData) {
      setQuiz(quizData);
      setAnswers(
        quizData.questions.map((q: aksara_Question) => ({
          questionId: q.id,
          selectedAnswer: null,
          isCorrect: null,
          showExplanation: false,
        }))
      );
    } else {
      router.push("/learn/aksara");
    }
  }, [quizId, router]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue_50/30 to-indigo_50/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue_600"></div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const correctAnswersCount = answers.filter((a) => a.isCorrect === true).length;
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (currentAnswer.selectedAnswer !== null) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      ...currentAnswer,
      selectedAnswer: answerIndex,
      isCorrect,
      showExplanation: true,
    };
    setAnswers(newAnswers);

    if (!isCorrect) {
      setWrongAttempts((prev) => prev + 1);
    }

    if (!isCorrect && wrongAttempts >= 1) {
      setShowHint(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowHint(false);
    } else {
      setShowResults(true);
      setTimeout(() => {
        setShowConfetti(true);
      }, 300);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers(
      quiz.questions.map((q: aksara_Question) => ({
        questionId: q.id,
        selectedAnswer: null,
        isCorrect: null,
        showExplanation: false,
      }))
    );
    setShowResults(false);
    setWrongAttempts(0);
    setShowHint(false);
    setShowConfetti(false);
  };

  const handleBackToModule = () => {
    router.push("/learn/aksara");
  };

  const handleNextActivity = () => {
    router.push(`/learn/aksara/games?id=${quizId}`);
  };

  const finalScore = calculateScore(quiz.questions.length, correctAnswersCount);
  const gradeInfo = getGradeFromScore(finalScore);
  const passed = finalScore >= quiz.passingScore;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue_50/30 to-indigo_50/30 pb-8 pt-6">
        <SubmoduleHeader
          title="Hasil Quiz"
          subtitle={quiz.title}
          icon={Award}
          gradientFrom="blue"
          gradientTo="indigo"
          backHref="/learn/aksara"
        />

        <main className="max-w-2xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                {[...Array(3)].map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: idx * 0.2, type: "spring" }}
                  >
                    <Star
                      className={`w-12 h-12 ${
                        idx < gradeInfo.stars
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="inline-block"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue_500 to-indigo_600 flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <div className="text-6xl font-bold text-white">
                    {gradeInfo.grade}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-5xl font-bold text-blue_900 mb-2">
                  {finalScore}
                </div>
                <p className="text-gray-600 mb-4">
                  {correctAnswersCount} dari {quiz.questions.length} jawaban benar
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  {gradeInfo.message}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6"
              >
                {passed ? (
                  <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full inline-flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    Kamu Lulus! 🎉
                  </div>
                ) : (
                  <div className="bg-orange-100 text-orange-800 px-6 py-3 rounded-full inline-flex items-center gap-2 font-semibold">
                    <Award className="w-5 h-5" />
                    Coba lagi ya! Nilai minimal: {quiz.passingScore}
                  </div>
                )}
              </motion.div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Review Jawaban
              </h3>
              <div className="space-y-3">
                {quiz.questions.map((question: aksara_Question, idx: number) => {
                  const answer = answers[idx];
                  return (
                    <div
                      key={question.id}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        answer.isCorrect ? "bg-green-50" : "bg-red-50"
                      }`}
                    >
                      {answer.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                      <span className="text-sm text-gray-700 flex-1">
                        Pertanyaan {idx + 1}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          answer.isCorrect
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {answer.isCorrect ? "Benar" : "Salah"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              {passed ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextActivity}
                  className="w-full bg-gradient-to-r from-blue_500 to-indigo_600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  Lanjut ke Mini Games
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              ) : null}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRetakeQuiz}
                className="w-full bg-gradient-to-r from-blue_600 to-indigo_600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Ulangi Quiz
              </motion.button>

              <button
                onClick={handleBackToModule}
                className="w-full bg-white/80 text-gray-700 font-semibold py-4 px-6 rounded-2xl shadow-md hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Kembali ke Nara TITLE
              </button>
            </div>
          </motion.div>
        </main>

        {finalScore >= 90 ? (
          <PerfectScoreCelebration show={showConfetti} />
        ) : passed ? (
          <ConfettiCelebration
            show={showConfetti}
            intensity="medium"
            message="Selamat! Kamu Lulus! 🎉"
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue_50/30 to-indigo_50/30 pb-8 pt-6">
      <SubmoduleHeader
        title={`Quiz: ${quiz.title}`}
        subtitle={`Pertanyaan ${currentQuestionIndex + 1} dari ${quiz.questions.length}`}
        icon={Award}
        gradientFrom="blue"
        gradientTo="indigo"
        backHref="/learn/aksara"
      />

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg border border-white/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-blue_600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue_600 to-indigo_600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue_500 to-indigo_600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {currentQuestionIndex + 1}
                </div>
                <div className="flex-1">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                      currentQuestion.difficulty === "easy"
                        ? "bg-green-100 text-green-700"
                        : currentQuestion.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {currentQuestion.difficulty === "easy"
                      ? "Mudah"
                      : currentQuestion.difficulty === "medium"
                      ? "Sedang"
                      : "Sulit"}
                  </span>
                  <p className="text-lg font-medium text-gray-900 leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl"
                  >
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-900 mb-1">
                          Petunjuk dari Nara:
                        </p>
                        <p className="text-sm text-yellow-800">
                          {currentQuestion.hint}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                {currentQuestion.options.map((option: string, idx: number) => {
                  const isSelected = currentAnswer.selectedAnswer === idx;
                  const isCorrect = idx === currentQuestion.correctAnswer;
                  const showResult = currentAnswer.selectedAnswer !== null;

                  return (
                    <motion.button
                      key={idx}
                      whileHover={!showResult ? { scale: 1.02 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswerSelect(idx)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-xl font-medium transition-all ${
                        !showResult
                          ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                          : isSelected
                          ? isCorrect
                            ? "bg-green-100 border-2 border-green-500 text-green-900"
                            : "bg-red-100 border-2 border-red-500 text-red-900"
                          : isCorrect
                          ? "bg-green-50 border-2 border-green-300 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResult && isSelected && (
                          <div>
                            {isCorrect ? (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                              <XCircle className="w-6 h-6 text-red-600" />
                            )}
                          </div>
                        )}
                        {showResult && !isSelected && isCorrect && (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {currentAnswer.showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mt-4 p-4 rounded-xl ${
                      currentAnswer.isCorrect
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold mb-2 ${
                        currentAnswer.isCorrect ? "text-green-900" : "text-red-900"
                      }`}
                    >
                      {currentAnswer.isCorrect
                        ? "✅ Jawaban Benar!"
                        : "❌ Jawaban Kurang Tepat"}
                    </p>
                    <p
                      className={`text-sm ${
                        currentAnswer.isCorrect ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {currentQuestion.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {currentAnswer.selectedAnswer !== null && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-blue_600 to-indigo_600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2"
              >
                {currentQuestionIndex < quiz.questions.length - 1 ? (
                  <>
                    Pertanyaan Selanjutnya
                    <ChevronRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Lihat Hasil
                    <Award className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <NaraAssistant
        context="quiz"
        currentProgress={Math.round(progress)}
        hints={[
          currentQuestion?.hint || "Baca pertanyaan dengan teliti ya! 📖",
          "Ingat-ingat pengetahuan yang sudah kamu pelajari! 💭",
          "Jangan terburu-buru, pikirkan baik-baik! 🤔",
        ]}
        autoGreet={true}
      />
    </div>
  );
}
