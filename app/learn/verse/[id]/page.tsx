"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Users,
  Award,
  Clock,
  Eye,
  Heart,
  Sparkles,
} from "lucide-react";
import { getStoryById, StoryData } from "@/lib/storiesData";
import SubmoduleHeader from "@/components/learn/SubmoduleHeader";
import GlassFooter from "@/components/learn/GlassFooter";
import NaraAssistant from "@/components/learn/NaraAssistant";
import ErrorBoundary from "@/components/ErrorBoundary";
import Image from "next/image";

function StoryDetailContent() {
  const params = useParams();
  const router = useRouter();
  const storyId = parseInt(params.id as string);

  const [story, setStory] = useState<StoryData | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{word: string; meaning: string} | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Check TTS support
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setTtsSupported(true);
    }
  }, []);

  const handleImageError = (imageSrc: string) => {
    setImageErrors(prev => new Set(prev).add(imageSrc));
  };

  useEffect(() => {
    const storyData = getStoryById(storyId);
    if (storyData) {
      setStory(storyData);
    } else {
      // Story not found, redirect back
      router.push("/learn/verse");
    }
  }, [storyId, router]);

  useEffect(() => {
    // Auto advance to next scene
    if (autoPlay && isReading && story) {
      const timer = setTimeout(() => {
        if (currentScene < story.scenes.length - 1) {
          setCurrentScene(currentScene + 1);
        } else {
          setAutoPlay(false);
          setIsReading(false);
        }
      }, 15000); // 15 seconds per scene

      return () => clearTimeout(timer);
    }
  }, [autoPlay, isReading, currentScene, story]);

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-pink-50/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // TTS Functions
  const handleToggleTTS = () => {
    if (!ttsSupported || !story || !story.scenes || !story.scenes[currentScene]) return;

    try {
      if (isSpeaking) {
        // Stop speaking
        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
      } else {
        // Start speaking
        const text = story.scenes[currentScene].content;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "id-ID"; // Indonesian language
        utterance.rate = 0.9; // Slightly slower for kids
        utterance.pitch = 1.0;

        utterance.onend = () => {
          setIsSpeaking(false);
        };

        utterance.onerror = (event) => {
          console.error("TTS error:", event);
          setIsSpeaking(false);
        };

        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.speak(utterance);
          setIsSpeaking(true);
        }
      }
    } catch (error) {
      console.error("TTS exception:", error);
      setIsSpeaking(false);
    }
  };

  // Stop TTS when scene changes
  useEffect(() => {
    if (isSpeaking && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScene]);

  // Cleanup TTS on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleNextScene = () => {
    if (story && story.scenes && currentScene < story.scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    }
  };

  const handlePrevScene = () => {
    if (story && story.scenes && currentScene > 0) {
      setCurrentScene(currentScene - 1);
    }
  };

  const handleStartReading = () => {
    setIsReading(true);
    setCurrentScene(0);
  };

  const handleWordClick = (word: string, meaning: string) => {
    setSelectedWord({ word, meaning });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-pink-50/30 pb-32 pt-6">
      {/* Header */}
      <SubmoduleHeader
        title={story.title}
        subtitle={`${story.region} • ${story.category}`}
        icon={BookOpen}
        gradientFrom="#8B5CF6"
        gradientTo="#EC4899"
        backHref="/learn/verse"
      />

      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {!isReading ? (
          /* Story Overview */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Hero Image */}
            <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
              {!imageErrors.has(story.thumbnail) ? (
                <Image
                  src={story.thumbnail}
                  alt={story.title}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(story.thumbnail)}
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-20 h-20 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">{story.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">{story.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{story.readTime}</span>
                  </div>
                </div>

                {story.isNew && (
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Baru
                  </span>
                )}
              </div>
            </div>

            {/* Synopsis Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50">
              <h2 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Sinopsis
              </h2>
              <p className="text-gray-700 leading-relaxed">{story.synopsis}</p>
            </div>

            {/* Characters */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50">
              <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Tokoh-tokoh
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {story.characters.map((character, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl"
                  >
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-300 bg-gray-200">
                      {!imageErrors.has(character.image) ? (
                        <Image
                          src={character.image}
                          alt={character.name}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(character.image)}
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">
                        {character.name}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {character.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Moral Value */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 shadow-lg border border-orange-200">
              <h2 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Nilai Moral
              </h2>
              <p className="text-gray-700 leading-relaxed italic">
                "{story.moralValue}"
              </p>
            </div>

            {/* Vocabulary Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50">
              <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Kosakata Penting
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {story.vocabulary.slice(0, 6).map((vocab, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-xl"
                  >
                    <p className="font-bold text-purple-900 text-sm">
                      {vocab.word}
                    </p>
                    <p className="text-xs text-gray-600">{vocab.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Reading Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartReading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Mulai Membaca Cerita
            </motion.button>
          </motion.div>
        ) : story.scenes && story.scenes.length > 0 && story.scenes[currentScene] ? (
          /* Reading Mode */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Progress Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Bagian {currentScene + 1} dari {story.scenes.length}
                </span>
                <span className="text-sm font-medium text-purple-600">
                  {Math.round(((currentScene + 1) / story.scenes.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentScene + 1) / story.scenes.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Scene Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50"
              >
                {/* Scene Image */}
                <div className="relative w-full h-64 md:h-80 bg-gray-200">
                  {!imageErrors.has(story.scenes[currentScene].image) ? (
                    <Image
                      src={story.scenes[currentScene].image}
                      alt={story.scenes[currentScene].title}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(story.scenes[currentScene].image)}
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                      {story.scenes[currentScene].title}
                    </h2>
                  </div>
                </div>

                {/* Scene Text */}
                <div className="p-6 md:p-8">
                  <p className="text-lg leading-relaxed text-gray-800 mb-6">
                    {story.scenes[currentScene].content}
                  </p>

                  {/* Scene Vocabulary */}
                  {story.scenes[currentScene].vocabulary &&
                   story.scenes[currentScene].vocabulary!.length > 0 && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mt-4">
                      <p className="text-sm font-bold text-purple-900 mb-2">
                        💡 Kosakata di bagian ini:
                      </p>
                      <div className="space-y-2">
                        {story.scenes[currentScene].vocabulary!.map((vocab, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleWordClick(vocab.word, vocab.meaning)}
                            className="block w-full text-left bg-white/70 hover:bg-white p-2 rounded-lg transition-colors"
                          >
                            <span className="font-semibold text-purple-700">
                              {vocab.word}
                            </span>
                            <span className="text-gray-600 text-sm ml-2">
                              - {vocab.meaning}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between gap-2 md:gap-4">
              <button
                onClick={handlePrevScene}
                disabled={currentScene === 0}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-semibold hidden sm:inline">Sebelumnya</span>
              </button>

              <button
                onClick={handleToggleTTS}
                disabled={!ttsSupported}
                className={`p-3 rounded-2xl shadow-lg transition-all ${
                  isSpeaking
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white/80 text-gray-700"
                } ${!ttsSupported ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label={isSpeaking ? "Stop membaca" : "Bacakan cerita"}
                title={!ttsSupported ? "Browser tidak support text-to-speech" : isSpeaking ? "Stop membaca" : "Bacakan cerita"}
              >
                {isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>

              {/* Next button or Quiz button */}
              {currentScene === story.scenes.length - 1 ? (
                <button
                  onClick={() => router.push(`/learn/verse/${storyId}/quiz`)}
                  className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all font-semibold"
                >
                  <span className="hidden sm:inline">Mulai Quiz</span>
                  <span className="sm:hidden">Quiz</span>
                  <Award className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleNextScene}
                  className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <span className="font-semibold hidden sm:inline">Selanjutnya</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Error state - Scene not found */
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Scene tidak ditemukan</p>
            <button
              onClick={() => setIsReading(false)}
              className="px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors"
            >
              Kembali ke Overview
            </button>
          </div>
        )}
      </main>

      {/* Word Meaning Popup */}
      <AnimatePresence>
        {selectedWord && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWord(null)}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-2">
                    {selectedWord.word}
                  </h3>
                  <p className="text-gray-700 text-lg">
                    {selectedWord.meaning}
                  </p>
                  <button
                    onClick={() => setSelectedWord(null)}
                    className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl hover:shadow-lg transition-all"
                  >
                    Mengerti!
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Nara Assistant - Floating Helper */}
      <NaraAssistant
        context="story"
        currentProgress={Math.round(((currentScene + 1) / (story?.scenes.length || 1)) * 100)}
        hints={[
          "Perhatikan kata-kata yang digarisbawahi, itu adalah kosakata penting! 💡",
          "Coba bayangkan ceritanya seperti film di pikiranmu! 🎬",
          "Kalau ada yang tidak mengerti, klik kata tersebut untuk melihat artinya! 📖",
          "Baca perlahan dan nikmati ceritanya. Tidak perlu terburu-buru! 🌸",
        ]}
        autoGreet={isReading}
      />

      <GlassFooter />
    </div>
  );
}

export default function StoryDetailPage() {
  return (
    <ErrorBoundary>
      <StoryDetailContent />
    </ErrorBoundary>
  );
}
