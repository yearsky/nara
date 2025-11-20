"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Puzzle,
  MapPin,
  Search,
  Trophy,
  Star,
  ArrowLeft,
  Lightbulb,
} from "lucide-react";
import SubmoduleHeader from "@/components/learn/SubmoduleHeader";
import GlassFooter from "@/components/learn/GlassFooter";
import NaraAssistant from "@/components/learn/NaraAssistant";
import { GameWinCelebration } from "@/components/learn/ConfettiCelebration";
import { mapGameData } from "@/lib/mapQuizData";

type GameType = "matching-museum" | "matching-heritage" | null;

// Matching Game - Museums to Regions
interface MatchingPair {
  id: number;
  name: string;
  answer: string;
  matched: boolean;
}

export default function MapGamesPage() {
  const router = useRouter();

  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Museum Matching Game State
  const [museumPairs, setMuseumPairs] = useState<MatchingPair[]>([]);
  const [selectedMuseum, setSelectedMuseum] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Heritage Matching Game State
  const [heritagePairs, setHeritagePairs] = useState<MatchingPair[]>([]);
  const [selectedHeritage, setSelectedHeritage] = useState<number | null>(null);
  const [selectedHeritageRegion, setSelectedHeritageRegion] = useState<number | null>(null);
  const [heritageCorrectMatches, setHeritageCorrectMatches] = useState(0);
  const [heritageAttempts, setHeritageAttempts] = useState(0);

  useEffect(() => {
    initMuseumGame();
    initHeritageGame();
  }, []);

  const initMuseumGame = () => {
    const pairs: MatchingPair[] = mapGameData.museums.map((museum, idx) => ({
      id: idx,
      name: museum.name,
      answer: museum.region,
      matched: false,
    }));
    setMuseumPairs(pairs);
  };

  const initHeritageGame = () => {
    const pairs: MatchingPair[] = mapGameData.heritageSites.map((site, idx) => ({
      id: idx,
      name: site.name,
      answer: site.region,
      matched: false,
    }));
    setHeritagePairs(pairs);
  };

  const handleMuseumSelect = (id: number) => {
    if (museumPairs[id].matched) return;
    setSelectedMuseum(id);

    // Check if region is already selected
    if (selectedRegion !== null) {
      checkMuseumMatch(id, selectedRegion);
    }
  };

  const handleRegionSelect = (id: number) => {
    if (museumPairs[id].matched) return;
    setSelectedRegion(id);

    // Check if museum is already selected
    if (selectedMuseum !== null) {
      checkMuseumMatch(selectedMuseum, id);
    }
  };

  const checkMuseumMatch = (museumId: number, regionId: number) => {
    setAttempts(attempts + 1);

    if (museumId === regionId) {
      // Correct match!
      const newPairs = [...museumPairs];
      newPairs[museumId].matched = true;
      setMuseumPairs(newPairs);
      setCorrectMatches(correctMatches + 1);

      // Check if all matched
      if (correctMatches + 1 === museumPairs.length) {
        setTimeout(() => {
          setShowCelebration(true);
        }, 500);
      }
    }

    // Reset selections
    setTimeout(() => {
      setSelectedMuseum(null);
      setSelectedRegion(null);
    }, 1000);
  };

  const resetMuseumGame = () => {
    initMuseumGame();
    setSelectedMuseum(null);
    setSelectedRegion(null);
    setCorrectMatches(0);
    setAttempts(0);
    setShowCelebration(false);
  };

  // Heritage Game Handlers
  const handleHeritageSelect = (id: number) => {
    if (heritagePairs[id].matched) return;
    setSelectedHeritage(id);

    // Check if region is already selected
    if (selectedHeritageRegion !== null) {
      checkHeritageMatch(id, selectedHeritageRegion);
    }
  };

  const handleHeritageRegionSelect = (id: number) => {
    if (heritagePairs[id].matched) return;
    setSelectedHeritageRegion(id);

    // Check if heritage is already selected
    if (selectedHeritage !== null) {
      checkHeritageMatch(selectedHeritage, id);
    }
  };

  const checkHeritageMatch = (heritageId: number, regionId: number) => {
    setHeritageAttempts(heritageAttempts + 1);

    if (heritageId === regionId) {
      // Correct match!
      const newPairs = [...heritagePairs];
      newPairs[heritageId].matched = true;
      setHeritagePairs(newPairs);
      setHeritageCorrectMatches(heritageCorrectMatches + 1);

      // Check if all matched
      if (heritageCorrectMatches + 1 === heritagePairs.length) {
        setTimeout(() => {
          setShowCelebration(true);
        }, 500);
      }
    }

    // Reset selections
    setTimeout(() => {
      setSelectedHeritage(null);
      setSelectedHeritageRegion(null);
    }, 1000);
  };

  const resetHeritageGame = () => {
    initHeritageGame();
    setSelectedHeritage(null);
    setSelectedHeritageRegion(null);
    setHeritageCorrectMatches(0);
    setHeritageAttempts(0);
    setShowCelebration(false);
  };

  const handleGameSelection = (game: GameType) => {
    setShowCelebration(false); // Reset celebration when switching games
    setSelectedGame(game);
  };

  // Game Selection Screen
  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-emerald-50/30 pb-32 pt-6">
        <SubmoduleHeader
          title="Mini Games"
          subtitle="Nara Map"
          icon={Gamepad2}
          gradientFrom="#10B981"
          gradientTo="#059669"
          backHref="/learn/map"
        />

        <main className="max-w-4xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Pilih Game yang Ingin Kamu Mainkan!
              </h2>
              <p className="text-gray-600">
                Mainkan game seru untuk menguji pengetahuan museum & heritage
              </p>
            </div>

            {/* Game Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Game 1: Museum Matching */}
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGameSelection("matching-museum")}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 text-left hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Puzzle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  Cocokkan Museum
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Cocokkan museum dengan wilayahnya yang tepat
                </p>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.button>

              {/* Game 2: Heritage Matching */}
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGameSelection("matching-heritage")}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 text-left hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  Cocokkan Heritage
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Cocokkan situs heritage dengan wilayahnya
                </p>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.button>
            </div>
          </motion.div>
        </main>

        <NaraAssistant
          context="game"
          hints={[
            "Pilih game yang kamu suka! Keduanya seru kok! 🎮",
            "Game ini akan menguji pengetahuanmu tentang museum & heritage! 😊",
          ]}
          autoGreet={true}
        />

        <GlassFooter />
      </div>
    );
  }

  // Museum Matching Game Screen
  if (selectedGame === "matching-museum") {
    const allMatched = correctMatches === museumPairs.length;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-cyan-50/50 pb-32 pt-6">
        {/* Header with Back Button */}
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <button
            onClick={() => setSelectedGame(null)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-2xl shadow-md hover:bg-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold text-gray-700">Kembali ke Menu</span>
          </button>
        </div>

        <SubmoduleHeader
          title="Cocokkan Museum"
          subtitle={`${correctMatches}/${museumPairs.length} cocok • ${attempts} percobaan`}
          icon={Puzzle}
          gradientFrom="#3B82F6"
          gradientTo="#06B6D4"
          backHref="/learn/map"
        />

        <main className="max-w-4xl mx-auto px-4 py-6">
          {!allMatched ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
                <p className="text-gray-700 font-medium">
                  Klik nama museum, lalu klik wilayah yang sesuai! 🏛️
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Museums Column */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 text-center">
                    Museum
                  </h3>
                  {museumPairs.map((pair) => (
                    <motion.button
                      key={`museum-${pair.id}`}
                      whileHover={!pair.matched ? { scale: 1.03 } : {}}
                      whileTap={!pair.matched ? { scale: 0.97 } : {}}
                      onClick={() => handleMuseumSelect(pair.id)}
                      disabled={pair.matched}
                      className={`w-full p-4 rounded-2xl font-bold text-lg transition-all ${
                        pair.matched
                          ? "bg-green-100 border-2 border-green-500 text-green-900 cursor-not-allowed"
                          : selectedMuseum === pair.id
                          ? "bg-blue-500 text-white shadow-lg scale-105"
                          : "bg-white hover:bg-blue-50 text-gray-800 shadow-md"
                      }`}
                    >
                      {pair.name}
                      {pair.matched && <span className="ml-2">✓</span>}
                    </motion.button>
                  ))}
                </div>

                {/* Regions Column */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 text-center">
                    Wilayah
                  </h3>
                  {museumPairs
                    .map((pair, idx) => ({ ...pair, originalId: idx }))
                    .sort(() => Math.random() - 0.5)
                    .map((pair) => (
                      <motion.button
                        key={`region-${pair.id}`}
                        whileHover={!pair.matched ? { scale: 1.03 } : {}}
                        whileTap={!pair.matched ? { scale: 0.97 } : {}}
                        onClick={() => handleRegionSelect(pair.originalId)}
                        disabled={pair.matched}
                        className={`w-full p-4 rounded-2xl text-sm transition-all text-left ${
                          pair.matched
                            ? "bg-green-100 border-2 border-green-500 text-green-900 cursor-not-allowed"
                            : selectedRegion === pair.originalId
                            ? "bg-cyan-500 text-white shadow-lg scale-105"
                            : "bg-white hover:bg-cyan-50 text-gray-700 shadow-md"
                        }`}
                      >
                        {pair.answer}
                        {pair.matched && <span className="ml-2">✓</span>}
                      </motion.button>
                    ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Win Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Selamat! 🎉
                </h2>
                <p className="text-gray-600 mb-4">
                  Kamu berhasil mencocokkan semua museum!
                </p>
                <div className="text-4xl font-bold text-blue-600">
                  {attempts} percobaan
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={resetMuseumGame}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Main Lagi
                  </button>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="w-full bg-white/80 text-gray-700 font-semibold py-4 px-6 rounded-2xl shadow-md hover:bg-white transition-all"
                  >
                    Pilih Game Lain
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </main>

        <GameWinCelebration show={showCelebration} />

        <NaraAssistant
          context="game"
          hints={[
            "Ingat di wilayah mana museum-museum terkenal berada! 🏛️",
            "Beberapa museum ada di Jakarta, ada juga di daerah lain! 🗺️",
            "Pikirkan baik-baik sebelum mencocokkan! 💭",
          ]}
          autoGreet={false}
        />

        <GlassFooter />
      </div>
    );
  }

  // Heritage Matching Game Screen
  if (selectedGame === "matching-heritage") {
    const allMatched = heritageCorrectMatches === heritagePairs.length;

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-emerald-50/50 pb-32 pt-6">
        {/* Header with Back Button */}
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <button
            onClick={() => setSelectedGame(null)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-2xl shadow-md hover:bg-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold text-gray-700">Kembali ke Menu</span>
          </button>
        </div>

        <SubmoduleHeader
          title="Cocokkan Heritage"
          subtitle={`${heritageCorrectMatches}/${heritagePairs.length} cocok • ${heritageAttempts} percobaan`}
          icon={MapPin}
          gradientFrom="#10B981"
          gradientTo="#059669"
          backHref="/learn/map"
        />

        <main className="max-w-4xl mx-auto px-4 py-6">
          {!allMatched ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
                <p className="text-gray-700 font-medium">
                  Klik nama situs heritage, lalu klik wilayah yang sesuai! 🏛️
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Heritage Sites Column */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 text-center">
                    Situs Heritage
                  </h3>
                  {heritagePairs.map((pair) => (
                    <motion.button
                      key={`heritage-${pair.id}`}
                      whileHover={!pair.matched ? { scale: 1.03 } : {}}
                      whileTap={!pair.matched ? { scale: 0.97 } : {}}
                      onClick={() => handleHeritageSelect(pair.id)}
                      disabled={pair.matched}
                      className={`w-full p-4 rounded-2xl font-bold text-lg transition-all ${
                        pair.matched
                          ? "bg-green-100 border-2 border-green-500 text-green-900 cursor-not-allowed"
                          : selectedHeritage === pair.id
                          ? "bg-green-500 text-white shadow-lg scale-105"
                          : "bg-white hover:bg-green-50 text-gray-800 shadow-md"
                      }`}
                    >
                      {pair.name}
                      {pair.matched && <span className="ml-2">✓</span>}
                    </motion.button>
                  ))}
                </div>

                {/* Regions Column */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 text-center">
                    Wilayah
                  </h3>
                  {heritagePairs
                    .map((pair, idx) => ({ ...pair, originalId: idx }))
                    .sort(() => Math.random() - 0.5)
                    .map((pair) => (
                      <motion.button
                        key={`heritage-region-${pair.id}`}
                        whileHover={!pair.matched ? { scale: 1.03 } : {}}
                        whileTap={!pair.matched ? { scale: 0.97 } : {}}
                        onClick={() => handleHeritageRegionSelect(pair.originalId)}
                        disabled={pair.matched}
                        className={`w-full p-4 rounded-2xl text-sm transition-all text-left ${
                          pair.matched
                            ? "bg-green-100 border-2 border-green-500 text-green-900 cursor-not-allowed"
                            : selectedHeritageRegion === pair.originalId
                            ? "bg-emerald-500 text-white shadow-lg scale-105"
                            : "bg-white hover:bg-emerald-50 text-gray-700 shadow-md"
                        }`}
                      >
                        {pair.answer}
                        {pair.matched && <span className="ml-2">✓</span>}
                      </motion.button>
                    ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Win Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <Trophy className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Sempurna! 🎉
                </h2>
                <p className="text-gray-600 mb-4">
                  Kamu berhasil mencocokkan semua situs heritage!
                </p>
                <div className="text-4xl font-bold text-green-600">
                  {heritageAttempts} percobaan
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={resetHeritageGame}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Main Lagi
                  </button>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="w-full bg-white/80 text-gray-700 font-semibold py-4 px-6 rounded-2xl shadow-md hover:bg-white transition-all"
                  >
                    Pilih Game Lain
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </main>

        <GameWinCelebration show={showCelebration} />

        <NaraAssistant
          context="game"
          hints={[
            "Ingat di mana situs-situs heritage terkenal berada! 🗺️",
            "Borobudur dan Prambanan ada di Jawa Tengah & DIY! 🏛️",
            "Pikirkan dengan teliti sebelum mencocokkan! 💭",
          ]}
          autoGreet={false}
        />

        <GlassFooter />
      </div>
    );
  }

  return null;
}
