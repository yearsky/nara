"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Grid3x3,
  Download,
  Heart,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import SubmoduleHeader from "@/components/learn/SubmoduleHeader";
import GlassFooter from "@/components/learn/GlassFooter";
import Image from "next/image";

const patterns = [
  {
    id: 1,
    name: "Batik Parang",
    region: "Jawa Tengah",
    category: "Batik",
    description: "Motif melengkung seperti ombak laut",
    thumbnail: "https://picsum.photos/seed/parang/400/400",
    colors: ["#8B4513", "#D2691E", "#F4A460"],
    views: 2340,
    likes: 189,
    downloads: 67,
  },
  {
    id: 2,
    name: "Batik Kawung",
    region: "Jawa Tengah",
    category: "Batik",
    description: "Pola bulat menyerupai buah kawung (aren)",
    thumbnail: "https://picsum.photos/seed/kawung/400/400",
    colors: ["#654321", "#8B7355", "#A0826D"],
    views: 1980,
    likes: 156,
    downloads: 54,
  },
  {
    id: 3,
    name: "Tenun Ikat Sumba",
    region: "Nusa Tenggara Timur",
    category: "Tenun",
    description: "Motif geometris khas Sumba dengan makna filosofis",
    thumbnail: "https://picsum.photos/seed/sumba/400/400",
    colors: ["#8B0000", "#FFD700", "#000080"],
    views: 1560,
    likes: 124,
    downloads: 45,
  },
  {
    id: 4,
    name: "Songket Palembang",
    region: "Sumatera Selatan",
    category: "Songket",
    description: "Kain mewah dengan benang emas",
    thumbnail: "https://picsum.photos/seed/songket/400/400",
    colors: ["#8B0000", "#FFD700", "#FF6347"],
    views: 1420,
    likes: 112,
    downloads: 38,
  },
  {
    id: 5,
    name: "Ulos Batak",
    region: "Sumatera Utara",
    category: "Tenun",
    description: "Kain adat dengan filosofi kehangatan",
    thumbnail: "https://picsum.photos/seed/ulos/400/400",
    colors: ["#B22222", "#000000", "#FFFFFF"],
    views: 1280,
    likes: 98,
    downloads: 32,
  },
  {
    id: 6,
    name: "Batik Mega Mendung",
    region: "Jawa Barat",
    category: "Batik",
    description: "Motif awan dengan gradasi warna cerah",
    thumbnail: "https://picsum.photos/seed/megamendung/400/400",
    colors: ["#4169E1", "#87CEEB", "#FFFFFF"],
    views: 1680,
    likes: 142,
    downloads: 51,
  },
];

export default function PolaPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");

  const filteredPatterns = patterns.filter((pattern) => {
    const matchesSearch = pattern.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "semua" || pattern.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "semua",
    ...Array.from(new Set(patterns.map((p) => p.category))),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/30 to-cyan-50/30 pb-32 pt-6">
      {/* Header */}
      <SubmoduleHeader
        title="Nara Pola"
        subtitle="Jelajahi batik, tenun, dan motif tradisional nusantara"
        icon={Grid3x3}
        gradientFrom="#14B8A6"
        gradientTo="#06B6D4"
      >
        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari motif..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 text-stone-900 placeholder:text-stone-400 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400/30 transition-all"
          />
        </div>
      </SubmoduleHeader>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Kategori</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Patterns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Pattern Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <Image
                  src={pattern.thumbnail}
                  alt={pattern.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <button className="flex-1 bg-white text-teal-600 py-2 rounded-full font-semibold text-sm hover:bg-teal-50 transition-colors">
                      Lihat Detail
                    </button>
                    <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Download className="w-5 h-5 text-teal-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-teal-600 bg-teal-100 px-2 py-1 rounded-full">
                    {pattern.category}
                  </span>
                  <span className="text-xs text-gray-500">{pattern.region}</span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {pattern.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {pattern.description}
                </p>

                {/* Color Palette */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-gray-500">Warna:</span>
                  <div className="flex gap-1">
                    {pattern.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{pattern.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{pattern.likes}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-teal-600">
                    <Download className="w-4 h-4" />
                    <span>{pattern.downloads}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPatterns.length === 0 && (
          <div className="text-center py-16">
            <Grid3x3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Tidak ada motif yang ditemukan</p>
          </div>
        )}

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Grid3x3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                Pelajari Filosofi Motif
              </h3>
              <p className="text-teal-100 mb-4">
                Setiap motif memiliki makna dan cerita tersendiri. Ikuti
                tutorial untuk memahami filosofi di balik setiap desain.
              </p>
              <button className="bg-white text-teal-600 px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all">
                Mulai Belajar
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Glass Footer */}
      <GlassFooter />
    </div>
  );
}
