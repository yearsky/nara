"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Music,
  UtensilsCrossed,
  MapPin,
  Palette,
  BookText,
  ChevronRight,
  ChevronLeft,
  Star,
  Flame,
  Trophy,
  Award,
} from "lucide-react";
import { useUserStore } from "@/stores/userStore";

const interests = [
  {
    id: "aksara",
    title: "Bahasa & Aksara",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
    module: "/learn/aksara",
  },
  {
    id: "verse",
    title: "Sastra & Cerita",
    icon: BookText,
    color: "from-purple-500 to-pink-600",
    module: "/learn/verse",
  },
  {
    id: "symphony",
    title: "Musik Tradisional",
    icon: Music,
    color: "from-pink-500 to-rose-600",
    module: "/learn/symphony",
  },
  {
    id: "map",
    title: "Museum & Heritage",
    icon: MapPin,
    color: "from-green-500 to-emerald-600",
    module: "/learn/map",
  },
  {
    id: "pola",
    title: "Seni & Desain",
    icon: Palette,
    color: "from-teal-500 to-cyan-600",
    module: "/learn/pola",
  },
  {
    id: "loka",
    title: "Kuliner Nusantara",
    icon: UtensilsCrossed,
    color: "from-amber-500 to-orange-600",
    module: "/learn/loka",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      // Store that user has completed onboarding
      if (typeof window !== "undefined") {
        localStorage.setItem("nara-onboarding-completed", "true");
        localStorage.setItem(
          "nara-user-interests",
          JSON.stringify(selectedInterests)
        );
      }
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nara-onboarding-completed", "true");
    }
    router.push("/dashboard");
  };

  const steps = [
    {
      title: "Selamat Datang di Nara.ai",
      subtitle: "Teman belajar budaya Indonesia",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-2xl">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">
              Halo, {user?.name || "Sobat Nara"}! 👋
            </h2>
            <p className="text-lg text-stone-600 max-w-md mx-auto leading-relaxed">
              Nara.ai adalah platform pembelajaran interaktif yang akan
              membantumu menjelajahi kekayaan budaya Indonesia dengan cara yang
              menyenangkan.
            </p>
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold text-orange-900">
                6+ Modul Belajar
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-900">
                AI Companion
              </span>
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Pilih Minat Kamu",
      subtitle: "Kami akan merekomendasikan konten yang sesuai",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-6">
            <p className="text-stone-600">
              Pilih minimal 1 topik yang kamu minati
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {interests.map((interest) => {
              const Icon = interest.icon;
              const isSelected = selectedInterests.includes(interest.id);
              return (
                <motion.button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`relative p-6 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-orange-500 bg-orange-50 shadow-lg scale-105"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                  whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Award className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>
                  )}
                  <div
                    className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${interest.color} flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className={`text-sm font-semibold ${
                      isSelected ? "text-orange-900" : "text-stone-900"
                    }`}
                  >
                    {interest.title}
                  </h3>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      ),
    },
    {
      title: "Sistem Gamifikasi",
      subtitle: "Belajar sambil bersenang-senang",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* XP Card */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="w-16 h-16 mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">XP Points</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Dapatkan XP setiap kali menyelesaikan pelajaran, quiz, atau
                challenge. Kumpulkan untuk naik level!
              </p>
              <div className="mt-4 px-3 py-2 rounded-full bg-white/20 text-center">
                <span className="text-xs font-semibold">
                  50-200 XP per lesson
                </span>
              </div>
            </div>

            {/* Streak Card */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="w-16 h-16 mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Streak</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Belajar setiap hari untuk mempertahankan streak! Semakin
                panjang streak, semakin besar bonus XP.
              </p>
              <div className="mt-4 px-3 py-2 rounded-full bg-white/20 text-center">
                <span className="text-xs font-semibold">
                  Bonus XP harian
                </span>
              </div>
            </div>

            {/* Badge Card */}
            <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="w-16 h-16 mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Badges</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Raih pencapaian istimewa untuk mendapatkan badge eksklusif.
                Kumpulkan semuanya!
              </p>
              <div className="mt-4 px-3 py-2 rounded-full bg-white/20 text-center">
                <span className="text-xs font-semibold">20+ badges</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-900">
              💡 <span className="font-semibold">Tips:</span> Belajar minimal 10
              menit setiap hari untuk hasil maksimal!
            </p>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Siap Memulai!",
      subtitle: "Petualangan budaya Indonesia menunggumu",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Trophy className="w-16 h-16 text-white" />
            </motion.div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">
              Kamu Siap! 🎉
            </h2>
            <p className="text-lg text-stone-600 max-w-md mx-auto leading-relaxed">
              {selectedInterests.length > 0
                ? `Kami sudah menyiapkan modul ${selectedInterests.length} topik pilihanmu. Mari mulai petualangan belajar!`
                : "Mari mulai petualangan belajar budaya Indonesia bersama Nara!"}
            </p>
          </div>

          {selectedInterests.length > 0 && (
            <div className="max-w-md mx-auto">
              <p className="text-sm font-semibold text-stone-700 mb-3">
                Rekomendasi modul pertama:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedInterests.slice(0, 3).map((interestId) => {
                  const interest = interests.find((i) => i.id === interestId);
                  if (!interest) return null;
                  const Icon = interest.icon;
                  return (
                    <div
                      key={interestId}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${interest.color} text-white shadow-md`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {interest.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-3 pt-4">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Gratis selamanya</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span>Belajar kapan saja</span>
            </div>
          </div>
        </motion.div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center p-4">
      {/* Progress Indicator */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-white/50">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep
                  ? "w-8 bg-gradient-to-r from-orange-500 to-amber-600"
                  : index < currentStep
                  ? "bg-orange-400"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Skip Button */}
      {currentStep < 3 && (
        <button
          onClick={handleSkip}
          className="fixed top-8 right-8 text-sm text-stone-600 hover:text-stone-900 font-semibold transition-colors"
        >
          Lewati
        </button>
      )}

      {/* Main Content */}
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12"
          >
            {/* Step Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">
                {currentStepData.title}
              </h1>
              <p className="text-stone-600">{currentStepData.subtitle}</p>
            </div>

            {/* Step Content */}
            <div className="mb-8">{currentStepData.content}</div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  currentStep === 0
                    ? "opacity-0 pointer-events-none"
                    : "bg-gray-100 hover:bg-gray-200 text-stone-700"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Kembali
              </button>

              <button
                onClick={handleNext}
                disabled={
                  currentStep === 1 && selectedInterests.length === 0
                }
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all shadow-lg ${
                  currentStep === 1 && selectedInterests.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white hover:shadow-xl hover:scale-105"
                }`}
              >
                {currentStep === 3 ? "Mulai Belajar" : "Lanjut"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
