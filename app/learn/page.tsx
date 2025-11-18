"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Trophy,
  Flame,
  Star,
  TrendingUp,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import BottomNav from "@/components/navigation/BottomNav";
import { useUserStore } from "@/stores/userStore";
import LearningModuleCard from "@/components/learn/LearningModuleCard";
import ContinueLearningCard from "@/components/learn/ContinueLearningCard";
import AchievementsCard from "@/components/learn/AchievementsCard";
import FilterPanel from "@/components/learn/FilterPanel";

// Learning modules data
const learningModules = [
  {
    id: "aksara",
    title: "Aksara Nusantara",
    subtitle: "Pelajari 8+ aksara tradisional",
    description: "Jelajahi keindahan aksara Jawa, Bali, Sunda, dan lainnya",
    category: "Bahasa & Tulisan",
    difficulty: "pemula",
    icon: "PenTool",
    gradientFrom: "#3B82F6",
    gradientTo: "#1D4ED8",
    href: "/learn/aksara",
    progress: 37,
    isNew: false,
    isLocked: false,
    estimatedTime: "15 menit",
    lessons: 12,
    completedLessons: 4,
  },
  {
    id: "verse",
    title: "Nara Verse",
    subtitle: "1000+ cerita & sastra rakyat",
    description: "Baca cerita rakyat, dongeng, dan sastra klasik nusantara",
    category: "Sastra & Cerita",
    difficulty: "pemula",
    icon: "BookOpen",
    gradientFrom: "#8B5CF6",
    gradientTo: "#6D28D9",
    href: "/learn/verse",
    progress: 12,
    isNew: true,
    isLocked: false,
    newContentCount: 5,
    estimatedTime: "10 menit",
    lessons: 8,
    completedLessons: 1,
  },
  {
    id: "symphony",
    title: "Nara Symphony",
    subtitle: "Musik & lagu tradisional",
    description: "Dengarkan dan pelajari alat musik serta lagu daerah",
    category: "Musik & Seni",
    difficulty: "menengah",
    icon: "Music",
    gradientFrom: "#EC4899",
    gradientTo: "#BE185D",
    href: "/learn/symphony",
    progress: 0,
    isNew: false,
    isLocked: false,
    estimatedTime: "20 menit",
    lessons: 10,
    completedLessons: 0,
  },
  {
    id: "map",
    title: "Nara Map",
    subtitle: "Jelajahi museum & heritage",
    description: "Kunjungi museum dan situs warisan budaya Indonesia",
    category: "Geografi & Wisata",
    difficulty: "pemula",
    icon: "MapPin",
    gradientFrom: "#10B981",
    gradientTo: "#059669",
    href: "/learn/map",
    progress: 0,
    isNew: true,
    isLocked: false,
    newContentCount: 3,
    estimatedTime: "25 menit",
    lessons: 6,
    completedLessons: 0,
  },
  {
    id: "loka",
    title: "Nara Loka",
    subtitle: "Kuliner & resep nusantara",
    description: "Masak dan cicipi resep tradisional dari seluruh Indonesia",
    category: "Kuliner",
    difficulty: "menengah",
    icon: "ChefHat",
    gradientFrom: "#F59E0B",
    gradientTo: "#D97706",
    href: "/learn/loka",
    progress: 0,
    isNew: false,
    isLocked: true,
    estimatedTime: "30 menit",
    lessons: 15,
    completedLessons: 0,
  },
  {
    id: "pola",
    title: "Nara Pola",
    subtitle: "Desain & motif tradisional",
    description: "Pelajari batik, tenun, dan motif khas nusantara",
    category: "Seni & Design",
    difficulty: "lanjutan",
    icon: "Grid3x3",
    gradientFrom: "#14B8A6",
    gradientTo: "#0D9488",
    href: "/learn/pola",
    progress: 0,
    isNew: false,
    isLocked: false,
    estimatedTime: "35 menit",
    lessons: 18,
    completedLessons: 0,
  },
];

export default function LearnPage() {
  const router = useRouter();
  const { stats } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("semua");
  const [selectedProgress, setSelectedProgress] = useState<string>("semua");

  // Filter and search modules
  const filteredModules = useMemo(() => {
    return learningModules.filter((module) => {
      // Search filter
      const matchesSearch =
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "semua" || module.category === selectedCategory;

      // Difficulty filter
      const matchesDifficulty =
        selectedDifficulty === "semua" ||
        module.difficulty === selectedDifficulty;

      // Progress filter
      const matchesProgress =
        selectedProgress === "semua" ||
        (selectedProgress === "belum-mulai" && module.progress === 0) ||
        (selectedProgress === "sedang-berjalan" &&
          module.progress > 0 &&
          module.progress < 100) ||
        (selectedProgress === "selesai" && module.progress === 100);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty &&
        matchesProgress &&
        !module.isLocked
      );
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedProgress]);

  // Continue learning module (last active module with progress)
  const continueModule = useMemo(() => {
    return learningModules.find(
      (module) => module.progress > 0 && module.progress < 100
    );
  }, []);

  // Categories for filter
  const categories = [
    "semua",
    ...Array.from(new Set(learningModules.map((m) => m.category))),
  ];

  const difficulties = ["semua", "pemula", "menengah", "lanjutan"];
  const progressOptions = [
    { value: "semua", label: "Semua Progress" },
    { value: "belum-mulai", label: "Belum Mulai" },
    { value: "sedang-berjalan", label: "Sedang Berjalan" },
    { value: "selesai", label: "Selesai" },
  ];

  // Calculate active filters count
  const activeFiltersCount =
    (selectedCategory !== "semua" ? 1 : 0) +
    (selectedDifficulty !== "semua" ? 1 : 0) +
    (selectedProgress !== "semua" ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          {/* Top Row - Back button and Title */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-brand-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Dashboard</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-heading font-bold text-brand-primary">
              Belajar
            </h1>

            <div className="w-20" /> {/* Spacer for centering */}
          </div>

          {/* Search and Filter Row */}
          <div className="flex gap-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari modul pembelajaran..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold transition-all",
                showFilters
                  ? "bg-brand-primary text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-brand-primary"
              )}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filter</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <FilterPanel
              categories={categories}
              difficulties={difficulties}
              progressOptions={progressOptions}
              selectedCategory={selectedCategory}
              selectedDifficulty={selectedDifficulty}
              selectedProgress={selectedProgress}
              onCategoryChange={setSelectedCategory}
              onDifficultyChange={setSelectedDifficulty}
              onProgressChange={setSelectedProgress}
              onReset={() => {
                setSelectedCategory("semua");
                setSelectedDifficulty("semua");
                setSelectedProgress("semua");
              }}
            />
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Row - Streak and Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Streak Belajar</p>
                <p className="text-2xl font-bold">{stats.streakDays} Hari</p>
              </div>
            </div>
            <p className="text-xs opacity-80">Jangan putus semangatmu! 🔥</p>
          </motion.div>

          {/* XP Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl p-5 text-white shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Total XP</p>
                <p className="text-2xl font-bold">{stats.xpPoints} XP</p>
              </div>
            </div>
            <p className="text-xs opacity-80">Level {stats.level} • Terus tingkatkan!</p>
          </motion.div>

          {/* Achievements Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl p-5 text-white shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Pencapaian</p>
                <p className="text-2xl font-bold">12 Badge</p>
              </div>
            </div>
            <p className="text-xs opacity-80">Kumpulkan lebih banyak! 🏆</p>
          </motion.div>
        </div>

        {/* Continue Learning Section */}
        {continueModule && !searchQuery && activeFiltersCount === 0 && (
          <ContinueLearningCard module={continueModule} />
        )}

        {/* Daily Achievements */}
        {!searchQuery && activeFiltersCount === 0 && <AchievementsCard />}

        {/* Learning Modules Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-stone-900">
              {searchQuery || activeFiltersCount > 0
                ? `Hasil (${filteredModules.length})`
                : "Semua Modul"}
            </h2>
            {filteredModules.length > 0 && (
              <button className="flex items-center gap-2 text-sm text-brand-primary hover:text-brand-dark font-semibold transition-colors">
                <TrendingUp className="w-4 h-4" />
                Urutkan
              </button>
            )}
          </div>

          {/* Module Cards Grid */}
          {filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module, index) => (
                <LearningModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tidak ada hasil
              </h3>
              <p className="text-gray-600 mb-6">
                Coba ubah kata kunci atau filter pencarian
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("semua");
                  setSelectedDifficulty("semua");
                  setSelectedProgress("semua");
                }}
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Reset Pencarian
              </button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
