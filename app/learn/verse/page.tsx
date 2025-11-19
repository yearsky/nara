"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Heart,
  Eye,
  Clock,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/navigation/BottomNav";
import Image from "next/image";

const stories = [
  {
    id: 1,
    title: "Malin Kundang",
    region: "Sumatera Barat",
    category: "Legenda",
    readTime: "8 menit",
    thumbnail: "https://picsum.photos/seed/malin/400/300",
    views: 1240,
    likes: 89,
    isNew: true,
  },
  {
    id: 2,
    title: "Roro Jonggrang",
    region: "Jawa Tengah",
    category: "Legenda",
    readTime: "12 menit",
    thumbnail: "https://picsum.photos/seed/roro/400/300",
    views: 2180,
    likes: 156,
    isNew: false,
  },
  {
    id: 3,
    title: "Timun Mas",
    region: "Jawa Tengah",
    category: "Dongeng",
    readTime: "6 menit",
    thumbnail: "https://picsum.photos/seed/timun/400/300",
    views: 980,
    likes: 72,
    isNew: true,
  },
  {
    id: 4,
    title: "Sangkuriang",
    region: "Jawa Barat",
    category: "Legenda",
    readTime: "10 menit",
    thumbnail: "https://picsum.photos/seed/sangkuriang/400/300",
    views: 1650,
    likes: 124,
    isNew: false,
  },
  {
    id: 5,
    title: "Bawang Merah Bawang Putih",
    region: "Jawa Timur",
    category: "Dongeng",
    readTime: "9 menit",
    thumbnail: "https://picsum.photos/seed/bawang/400/300",
    views: 1420,
    likes: 98,
    isNew: false,
  },
  {
    id: 6,
    title: "Calon Arang",
    region: "Bali",
    category: "Mitologi",
    readTime: "15 menit",
    thumbnail: "https://picsum.photos/seed/calon/400/300",
    views: 856,
    likes: 64,
    isNew: true,
  },
];

const categoryTabs = [
  { id: 'semua', label: 'Semua', icon: '📚' },
  { id: 'Legenda', label: 'Legenda', icon: '🏛️' },
  { id: 'Dongeng', label: 'Dongeng', icon: '🧚' },
  { id: 'Mitologi', label: 'Mitologi', icon: '⚡' },
];

const regionTabs = [
  { id: 'semua', label: 'Semua Daerah' },
  { id: 'Jawa Barat', label: 'Jawa Barat' },
  { id: 'Jawa Tengah', label: 'Jawa Tengah' },
  { id: 'Jawa Timur', label: 'Jawa Timur' },
  { id: 'Sumatera Barat', label: 'Sumatera Barat' },
  { id: 'Bali', label: 'Bali' },
];

export default function VersePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [selectedRegion, setSelectedRegion] = useState("semua");

  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "semua" || story.category === selectedCategory;
    const matchesRegion =
      selectedRegion === "semua" || story.region === selectedRegion;
    return matchesSearch && matchesCategory && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
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
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">Nara Verse</h1>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">
                  1000+ Cerita
                </span>
              </div>
              <p className="text-purple-100">
                Cerita rakyat, dongeng, dan sastra klasik nusantara
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari cerita..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-purple-200 focus:bg-white/30 focus:outline-none transition-all"
            />
          </div>

          {/* Category Submenu Tabs */}
          <div className="mb-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedCategory === tab.id
                      ? 'bg-white text-purple-700 font-semibold shadow-md'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Region Submenu Tabs */}
          <div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {regionTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm ${
                    selectedRegion === tab.id
                      ? 'bg-white text-purple-700 font-semibold shadow-md'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-700">
            Menampilkan <span className="font-bold text-purple-700">{filteredStories.length}</span>{' '}
            dari {stories.length} cerita
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={story.thumbnail}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {story.isNew && (
                  <div className="absolute top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Baru
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {story.category}
                  </span>
                  <span className="text-xs text-gray-500">{story.region}</span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {story.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{story.readTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{story.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{story.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Tidak ada cerita yang ditemukan</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
