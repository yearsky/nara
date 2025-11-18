"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChefHat,
  Clock,
  Users,
  Flame,
  BookmarkPlus,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/navigation/BottomNav";
import Image from "next/image";

const recipes = [
  {
    id: 1,
    name: "Rendang",
    region: "Sumatera Barat",
    difficulty: "Sulit",
    cookTime: "4 jam",
    servings: 6,
    thumbnail: "https://picsum.photos/seed/rendang/400/300",
    likes: 1580,
    isPopular: true,
  },
  {
    id: 2,
    name: "Gudeg Jogja",
    region: "Yogyakarta",
    difficulty: "Sedang",
    cookTime: "3 jam",
    servings: 4,
    thumbnail: "https://picsum.photos/seed/gudeg/400/300",
    likes: 1240,
    isPopular: true,
  },
  {
    id: 3,
    name: "Soto Betawi",
    region: "Jakarta",
    difficulty: "Sedang",
    cookTime: "2 jam",
    servings: 5,
    thumbnail: "https://picsum.photos/seed/soto/400/300",
    likes: 980,
    isPopular: false,
  },
  {
    id: 4,
    name: "Pempek Palembang",
    region: "Sumatera Selatan",
    difficulty: "Sedang",
    cookTime: "1.5 jam",
    servings: 4,
    thumbnail: "https://picsum.photos/seed/pempek/400/300",
    likes: 876,
    isPopular: false,
  },
  {
    id: 5,
    name: "Ayam Betutu",
    region: "Bali",
    difficulty: "Sulit",
    cookTime: "5 jam",
    servings: 6,
    thumbnail: "https://picsum.photos/seed/betutu/400/300",
    likes: 756,
    isPopular: false,
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
  },
];

const difficultyColors = {
  Mudah: "bg-green-100 text-green-700",
  Sedang: "bg-yellow-100 text-yellow-700",
  Sulit: "bg-red-100 text-red-700",
};

export default function LokaPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <button
            onClick={() => router.push("/learn")}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Kembali ke Belajar</span>
          </button>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">Nara Loka</h1>
                <span className="bg-amber-800 px-2 py-1 rounded-full text-xs font-semibold">
                  🔒 Terkunci
                </span>
              </div>
              <p className="text-orange-100">
                Masak dan cicipi resep tradisional Indonesia
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari resep..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-orange-200 focus:bg-white/30 focus:outline-none transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
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

      <BottomNav />
    </div>
  );
}
