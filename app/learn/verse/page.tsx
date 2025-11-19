"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Heart,
  Eye,
  Clock,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SubmoduleHeader from "@/components/learn/SubmoduleHeader";
import GlassFooter from "@/components/learn/GlassFooter";
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-pink-50/30 pb-32 pt-6">
      {/* Header */}
      <SubmoduleHeader
        title="Nara Verse"
        subtitle="1000+ cerita & sastra rakyat"
        icon={BookOpen}
        gradientFrom="#8B5CF6"
        gradientTo="#EC4899"
      >
        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari cerita..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 text-stone-900 placeholder:text-stone-400 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all"
          />

        </div>
      </SubmoduleHeader>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Results Count & Filter Button */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-700">
            Menampilkan <span className="font-bold text-purple-700">{filteredStories.length}</span>{' '}
            dari {stories.length} cerita
          </p>

          {/* Filter Button - Mobile Only */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-semibold">Filter</span>
          </button>
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
                {/* Category Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Kategori</h4>
                  <div className="flex flex-wrap gap-2">
                    {categoryTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedCategory(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                          selectedCategory === tab.id
                            ? 'bg-purple-600 text-white font-semibold shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span>{tab.icon}</span>
                        <span className="text-sm">{tab.label}</span>
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
                        onClick={() => setSelectedRegion(tab.id)}
                        className={`px-4 py-2 rounded-full transition-all text-sm ${
                          selectedRegion === tab.id
                            ? 'bg-purple-600 text-white font-semibold shadow-md'
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
                    setSelectedCategory('semua');
                    setSelectedRegion('semua');
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg"
                >
                  Terapkan
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Glass Footer */}
      <GlassFooter />
    </div>
  );
}
