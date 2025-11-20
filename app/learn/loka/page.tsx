"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChefHat,
  Clock,
  Users,
  Flame,
  BookmarkPlus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SubmoduleHeader from "@/components/learn/SubmoduleHeader";
import GlassFooter from "@/components/learn/GlassFooter";
import QuizGamesFAB from "@/components/learn/QuizGamesFAB";
import Image from "next/image";

type RecipeType = 'Makanan Utama' | 'Kudapan' | 'Minuman';
type Difficulty = 'Mudah' | 'Sedang' | 'Sulit' | 'Semua';
type Region = 'Semua' | 'Jawa' | 'Sumatera' | 'Bali & Nusa Tenggara' | 'Papua';

const recipes = [
  {
    id: 1,
    name: "Rendang",
    region: "Sumatera",
    difficulty: "Sulit",
    cookTime: "4 jam",
    servings: 6,
    thumbnail: "https://picsum.photos/seed/rendang/400/300",
    likes: 1580,
    isPopular: true,
    type: 'Makanan Utama' as RecipeType,
  },
  {
    id: 2,
    name: "Gudeg Jogja",
    region: "Jawa",
    difficulty: "Sedang",
    cookTime: "3 jam",
    servings: 4,
    thumbnail: "https://picsum.photos/seed/gudeg/400/300",
    likes: 1240,
    isPopular: true,
    type: 'Makanan Utama' as RecipeType,
  },
  {
    id: 3,
    name: "Soto Betawi",
    region: "Jawa",
    difficulty: "Sedang",
    cookTime: "2 jam",
    servings: 5,
    thumbnail: "https://picsum.photos/seed/soto/400/300",
    likes: 980,
    isPopular: false,
    type: 'Makanan Utama' as RecipeType,
  },
  {
    id: 4,
    name: "Pempek Palembang",
    region: "Sumatera",
    difficulty: "Sedang",
    cookTime: "1.5 jam",
    servings: 4,
    thumbnail: "https://picsum.photos/seed/pempek/400/300",
    likes: 876,
    isPopular: false,
    type: 'Kudapan' as RecipeType,
  },
  {
    id: 5,
    name: "Ayam Betutu",
    region: "Bali & Nusa Tenggara",
    difficulty: "Sulit",
    cookTime: "5 jam",
    servings: 6,
    thumbnail: "https://picsum.photos/seed/betutu/400/300",
    likes: 756,
    isPopular: false,
    type: 'Makanan Utama' as RecipeType,
  },
  {
    id: 6,
    name: "Papeda",
    region: "Papua",
    difficulty: "Mudah",
    cookTime: "30 menit",
    servings: 3,
    thumbnail: "https://picsum.photos/seed/papeda/400/300",
    likes: 642,
    isPopular: false,
    type: 'Makanan Utama' as RecipeType,
  },
];

const difficultyColors = {
  Mudah: "bg-green-100 text-green-700",
  Sedang: "bg-yellow-100 text-yellow-700",
  Sulit: "bg-red-100 text-red-700",
};

const typeTabs = [
  { id: 'Semua', label: 'Semua', icon: '🍽️' },
  { id: 'Makanan Utama', label: 'Makanan Utama', icon: '🍛' },
  { id: 'Kudapan', label: 'Kudapan', icon: '🥟' },
  { id: 'Minuman', label: 'Minuman', icon: '🧋' },
];

const difficultyTabs = [
  { id: 'Semua', label: 'Semua Level' },
  { id: 'Mudah', label: 'Mudah' },
  { id: 'Sedang', label: 'Sedang' },
  { id: 'Sulit', label: 'Sulit' },
];

const regionTabs = [
  { id: 'Semua', label: 'Semua Daerah' },
  { id: 'Jawa', label: 'Jawa' },
  { id: 'Sumatera', label: 'Sumatera' },
  { id: 'Bali & Nusa Tenggara', label: 'Bali & Nusa Tenggara' },
  { id: 'Papua', label: 'Papua' },
];

export default function LokaPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState('Semua');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Semua');
  const [selectedRegion, setSelectedRegion] = useState<Region>('Semua');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'Semua' || recipe.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'Semua' || recipe.difficulty === selectedDifficulty;
    const matchesRegion = selectedRegion === 'Semua' || recipe.region === selectedRegion;

    return matchesSearch && matchesType && matchesDifficulty && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-yellow-50/30 pb-32 pt-6">
      {/* Header */}
      <SubmoduleHeader
        title="Nara Loka 🔒"
        subtitle="Kuliner & resep nusantara"
        icon={ChefHat}
        gradientFrom="#F59E0B"
        gradientTo="#D97706"
      >
        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari resep..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 text-stone-900 placeholder:text-stone-400 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all"
          />

        </div>
      </SubmoduleHeader>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Results Count & Filter Button */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-700">
            Menampilkan <span className="font-bold text-orange-700">{filteredRecipes.length}</span>{' '}
            dari {recipes.length} resep
          </p>

          {/* Filter Button - Mobile Only */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-semibold">Filter</span>
          </button>
        </div>

        {/* Lock Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-100 border-2 border-amber-300 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
              <ChefHat className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">
                Modul Terkunci 🔒
              </h3>
              <p className="text-amber-800 mb-4">
                Selesaikan modul Aksara Nusantara minimal 50% untuk membuka
                Nara Loka dan mulai menjelajahi resep kuliner nusantara.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/learn/aksara")}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md"
                >
                  Lanjutkan Belajar Aksara
                </button>
                <button className="bg-white text-amber-700 px-6 py-2.5 rounded-full font-semibold border-2 border-amber-300 hover:bg-amber-50 transition-all">
                  Lihat Progress
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preview: Recipe Grid (Blurred) */}
        <div className="relative">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/40 z-10 rounded-2xl flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ChefHat className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Segera Hadir!
              </h3>
              <p className="text-gray-700 mb-4">
                Selesaikan pelajaran lain untuk membuka konten ini
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50 pointer-events-none select-none">
            {filteredRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative h-48">
                  <Image
                    src={recipe.thumbnail}
                    alt={recipe.name}
                    fill
                    className="object-cover"
                  />
                  {recipe.isPopular && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      Populer
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        difficultyColors[
                          recipe.difficulty as keyof typeof difficultyColors
                        ]
                      }`}
                    >
                      {recipe.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">
                      {recipe.region}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-3">
                    {recipe.name}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} porsi</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      ❤️ {recipe.likes} suka
                    </span>
                    <button className="text-orange-600 hover:text-orange-700">
                      <BookmarkPlus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Filter Sheet - Floating Bottom Card */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />

            {/* Filter Card */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[80vh] overflow-hidden md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Filter</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="p-4 overflow-y-auto max-h-[calc(80vh-140px)]">
                {/* Type Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Jenis Makanan</h4>
                  <div className="flex flex-wrap gap-2">
                    {typeTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedType(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                          selectedType === tab.id
                            ? 'bg-orange-600 text-white font-semibold shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span>{tab.icon}</span>
                        <span className="text-sm">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Tingkat Kesulitan</h4>
                  <div className="flex flex-wrap gap-2">
                    {difficultyTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedDifficulty(tab.id as Difficulty)}
                        className={`px-4 py-2 rounded-full transition-all text-sm ${
                          selectedDifficulty === tab.id
                            ? 'bg-orange-600 text-white font-semibold shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Daerah</h4>
                  <div className="flex flex-wrap gap-2">
                    {regionTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedRegion(tab.id as Region)}
                        className={`px-4 py-2 rounded-full transition-all text-sm ${
                          selectedRegion === tab.id
                            ? 'bg-orange-600 text-white font-semibold shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedType('Semua');
                    setSelectedDifficulty('Semua');
                    setSelectedRegion('Semua');
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-lg"
                >
                  Terapkan
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Glass Footer */}
      {/* Quiz & Games FAB */}
      <QuizGamesFAB modulePath="/learn/loka" />

      <GlassFooter />
    </div>
  );
}
