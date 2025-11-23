"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Music,
  Play,
  Pause,
  Volume2,
  Heart,
  Share2,
  CheckCircle,
  Lock,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import SubmoduleHeader from "@/components/learn/SubmoduleHeader";
import GlassFooter from "@/components/learn/GlassFooter";
import QuizGamesFAB from "@/components/learn/QuizGamesFAB";
import Image from "next/image";
import { SymphonyTour } from "@/components/learn/tours/SymphonyTour";

const musicCategories = [
  {
    id: 1,
    name: "Gamelan Jawa",
    region: "Jawa Tengah",
    description: "Musik tradisional dengan instrumen perunggu",
    thumbnail: "https://picsum.photos/seed/gamelan/400/300",
    tracks: 12,
    icon: "🎼",
  },
  {
    id: 2,
    name: "Angklung Sunda",
    region: "Jawa Barat",
    description: "Alat musik bambu khas Sunda",
    thumbnail: "https://picsum.photos/seed/angklung/400/300",
    tracks: 8,
    icon: "🎵",
  },
  {
    id: 3,
    name: "Gendang Bali",
    region: "Bali",
    description: "Irama sakral gamelan Bali",
    thumbnail: "https://picsum.photos/seed/gendang/400/300",
    tracks: 10,
    icon: "🥁",
  },
  {
    id: 4,
    name: "Sasando NTT",
    region: "Nusa Tenggara Timur",
    description: "Alat musik petik dari daun lontar",
    thumbnail: "https://picsum.photos/seed/sasando/400/300",
    tracks: 6,
    icon: "🎸",
  },
  {
    id: 5,
    name: "Kolintang Sulawesi",
    region: "Sulawesi Utara",
    description: "Instrumen perkusi kayu Minahasa",
    thumbnail: "https://picsum.photos/seed/kolintang/400/300",
    tracks: 7,
    icon: "🎹",
  },
  {
    id: 6,
    name: "Saluang Minang",
    region: "Sumatera Barat",
    description: "Suling bambu khas Minangkabau",
    thumbnail: "https://picsum.photos/seed/saluang/400/300",
    tracks: 9,
    icon: "🪈",
  },
];

const popularTracks = [
  {
    id: 1,
    title: "Lancaran Ricik-ricik",
    artist: "Gamelan Kyai Kanyut Mesem",
    duration: "4:32",
    plays: 1250,
  },
  {
    id: 2,
    title: "Halo-halo Bandung",
    artist: "Angklung Saung Udjo",
    duration: "3:48",
    plays: 980,
  },
  {
    id: 3,
    title: "Janger",
    artist: "Gamelan Semara Pagulingan",
    duration: "5:15",
    plays: 756,
  },
];

const lessons = [
  {
    id: 1,
    title: "Pengenalan Gamelan",
    description: "Mengenal gamelan dan perannya dalam budaya Jawa",
    duration: "12 menit",
    isCompleted: false,
    isLocked: false,
    xp: 75,
  },
  {
    id: 2,
    title: "Instrumen Gamelan",
    description: "Jenis-jenis instrumen dalam ansambel gamelan",
    duration: "15 menit",
    isCompleted: false,
    isLocked: true,
    xp: 100,
  },
  {
    id: 3,
    title: "Angklung Sunda",
    description: "Alat musik bambu khas Jawa Barat",
    duration: "10 menit",
    isCompleted: false,
    isLocked: true,
    xp: 80,
  },
];

export default function SymphonyPage() {
  const router = useRouter();
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);

  const completedLessons = lessons.filter((l) => l.isCompleted).length;
  const totalLessons = lessons.length;
  const progress = Math.round((completedLessons / totalLessons) * 100);
  const totalXP = lessons.filter((l) => l.isCompleted).reduce((sum, l) => sum + l.xp, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-rose-50/30 pb-32 pt-6">
      {/* Header */}
      <SubmoduleHeader
        title="Nara Symphony 🔒"
        subtitle="Dengarkan dan pelajari musik tradisional nusantara"
        icon={Music}
        gradientFrom="#EC4899"
        gradientTo="#F43F5E"
      >
        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-3 text-center border border-white/30">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Music className="w-3.5 h-3.5 text-pink-600" />
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
      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-8">
        {/* Lock Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-pink-100 border-2 border-pink-300 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0">
              <Music className="w-6 h-6 text-pink-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-pink-900 mb-2">
                Modul Terkunci 🔒
              </h3>
              <p className="text-pink-800 mb-4">
                Modul Nara Symphony akan segera hadir! Nantikan pembelajaran interaktif
                tentang gamelan, angklung, dan alat musik tradisional nusantara lainnya.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/learn")}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md"
                >
                  Kembali ke Daftar Modul
                </button>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-white text-pink-700 px-6 py-2.5 rounded-full font-semibold border-2 border-pink-300 hover:bg-pink-50 transition-all">
                  Lihat Dashboard
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lessons List */}
        <div className="relative">
          {/* Blurred overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/40 z-10 rounded-2xl flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Music className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Segera Hadir!
              </h3>
              <p className="text-gray-700 mb-4">
                Pelajaran musik tradisional akan segera tersedia
              </p>
            </div>
          </div>

          <div className="space-y-3 opacity-50 pointer-events-none select-none">
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
                    router.push(`/learn/symphony/lesson/${lesson.id}`);
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
                        : "bg-pink-100 text-pink-600"
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
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
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
        </div>

        {/* Popular Tracks */}
        <div className="relative">
          {/* Blurred overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/40 z-10 rounded-2xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="opacity-50 pointer-events-none select-none"
          >
            <h2 className="text-xl font-bold text-stone-900 mb-4">
              🔥 Sedang Populer
            </h2>
          <div className="bg-white rounded-2xl shadow-md p-5 space-y-3">
            {popularTracks.map((track, index) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {/* Play Button */}
                <button
                  onClick={() =>
                    setPlayingTrack(
                      playingTrack === track.id ? null : track.id
                    )
                  }
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform shadow-md"
                >
                  {playingTrack === track.id ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-stone-900 truncate">
                    {track.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {track.artist}
                  </p>
                </div>

                {/* Duration and Actions */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{track.duration}</span>
                  <button className="text-gray-400 hover:text-pink-600 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          </motion.div>
        </div>

        {/* Music Categories */}
        <div className="relative">
          {/* Blurred overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/40 z-10 rounded-2xl" />

          <div className="opacity-50 pointer-events-none select-none">
            <h2 className="text-xl font-bold text-stone-900 mb-4">
              Jelajahi Alat Musik
            </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.thumbnail}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Icon Overlay */}
                  <div className="absolute top-3 right-3 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-7 h-7 text-pink-600 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-pink-600 bg-pink-100 px-2 py-1 rounded-full">
                      {category.region}
                    </span>
                    <span className="text-sm text-gray-600">
                      {category.tracks} lagu
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          </div>
        </div>

        {/* Learning Resources */}
        <div className="relative">
          {/* Blurred overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/40 z-10 rounded-2xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl shadow-lg p-6 text-white opacity-50 pointer-events-none select-none"
          >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                Pelajari Alat Musik Tradisional
              </h3>
              <p className="text-pink-100 mb-4">
                Ikuti tutorial interaktif untuk belajar memainkan alat musik
                tradisional Indonesia
              </p>
              <button className="bg-white text-pink-600 px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all">
                Mulai Tutorial
              </button>
            </div>
          </div>
          </motion.div>
        </div>
      </main>

      {/* Glass Footer */}
      {/* Quiz & Games FAB */}
      <QuizGamesFAB modulePath="/learn/symphony" />

      <GlassFooter />
    </div>
  );
}
