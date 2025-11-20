"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Puzzle,
  ListOrdered,
  Search,
  Trophy,
  Star,
  ArrowLeft,
  Lightbulb,
} from "lucide-react";
import { getStoryById, StoryData } from "@/lib/storiesData";
import SubmoduleHeader from "@/components/learn/SubmoduleHeader";
import GlassFooter from "@/components/learn/GlassFooter";
import NaraAssistant from "@/components/learn/NaraAssistant";
import { GameWinCelebration } from "@/components/learn/ConfettiCelebration";

type GameType = "matching" | "sequencing" | "word-hunt" | null;

// Game 1: Puzzle Matching
interface MatchingPair {
  id: number;
  character: string;
  description: string;
  matched: boolean;
}

// Game 2: Story Sequencing
interface SceneCard {
  id: number;
  title: string;
  content: string;
  correctOrder: number;
  currentOrder: number;
}

export default function GamesPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = parseInt(params.id as string);

  const [story, setStory] = useState<StoryData | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Matching Game State
  const [matchingPairs, setMatchingPairs] = useState<MatchingPair[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<number | null>(null);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Sequencing Game State
  const [sceneCards, setSceneCards] = useState<SceneCard[]>([]);
  const [selectedScene, setSelectedScene] = useState<number | null>(null);
  const [sequencingComplete, setSequencingComplete] = useState(false);
  const [sequencingAttempts, setSequencingAttempts] = useState(0);
  const [showCorrectOrder, setShowCorrectOrder] = useState(false);

  useEffect(() => {
    const storyData = getStoryById(storyId);
    if (storyData) {
      setStory(storyData);
      initMatchingGame(storyData);
      initSequencingGame(storyData);
    } else {
      router.push("/learn/verse");
    }
  }, [storyId, router]);

  const initMatchingGame = (storyData: StoryData) => {
    const pairs: MatchingPair[] = storyData.characters.map((char, idx) => ({
      id: idx,
      character: char.name,
      description: char.description,
      matched: false,
    }));
    setMatchingPairs(pairs);
  };

  const initSequencingGame = (storyData: StoryData) => {
    // Take first 5 scenes for the game
    const scenes = storyData.scenes.slice(0, 5);
    const shuffled = scenes
      .map((scene, idx) => ({
        id: scene.id,
        title: scene.title,
        content: scene.content.substring(0, 100) + "...",
        correctOrder: idx,
        currentOrder: idx,
      }))
      .sort(() => Math.random() - 0.5)
      .map((scene, idx) => ({ ...scene, currentOrder: idx }));
    setSceneCards(shuffled);
  };

  const handleCharacterSelect = (id: number) => {
    if (matchingPairs[id].matched) return;
    setSelectedCharacter(id);

    // Check if description is already selected
    if (selectedDescription !== null) {
      checkMatch(id, selectedDescription);
    }
  };

  const handleDescriptionSelect = (id: number) => {
    if (matchingPairs[id].matched) return;
    setSelectedDescription(id);

    // Check if character is already selected
    if (selectedCharacter !== null) {
      checkMatch(selectedCharacter, id);
    }
  };

  const checkMatch = (charId: number, descId: number) => {
    setAttempts(attempts + 1);

    if (charId === descId) {
      // Correct match!
      const newPairs = [...matchingPairs];
      newPairs[charId].matched = true;
      setMatchingPairs(newPairs);
      setCorrectMatches(correctMatches + 1);

      // Check if all matched
      if (correctMatches + 1 === matchingPairs.length) {
        setTimeout(() => {
          setShowCelebration(true);
        }, 500);
      }
    }

    // Reset selections
    setTimeout(() => {
      setSelectedCharacter(null);
      setSelectedDescription(null);
    }, 1000);
  };

  const resetMatchingGame = () => {
    if (story) {
      initMatchingGame(story);
    }
    setSelectedCharacter(null);
    setSelectedDescription(null);
    setCorrectMatches(0);
    setAttempts(0);
    setShowCelebration(false);
  };

  // Sequencing Game Handlers
  const handleSceneClick = (currentOrder: number) => {
    if (selectedScene === null) {
      setSelectedScene(currentOrder);
    } else {
      // Swap positions
      const newScenes = [...sceneCards];
      const idx1 = newScenes.findIndex((s) => s.currentOrder === selectedScene);
      const idx2 = newScenes.findIndex((s) => s.currentOrder === currentOrder);

      if (idx1 !== -1 && idx2 !== -1) {
        // Swap currentOrder values
        const temp = newScenes[idx1].currentOrder;
        newScenes[idx1].currentOrder = newScenes[idx2].currentOrder;
        newScenes[idx2].currentOrder = temp;

        setSceneCards(newScenes);
        setSequencingAttempts(sequencingAttempts + 1);
      }

      setSelectedScene(null);
    }
  };

  const checkSequencingOrder = () => {
    const isCorrect = sceneCards.every(
      (scene) => scene.correctOrder === scene.currentOrder
    );
    if (isCorrect) {
      setSequencingComplete(true);
      setTimeout(() => {
        setShowCelebration(true);
      }, 500);
    }
  };

  const resetSequencingGame = () => {
    if (story) {
      initSequencingGame(story);
    }
    setSelectedScene(null);
    setSequencingComplete(false);
    setSequencingAttempts(0);
    setShowCelebration(false);
    setShowCorrectOrder(false);
  };

  const handleGameSelection = (game: GameType) => {
    setShowCelebration(false); // Reset celebration when switching games
    setSelectedGame(game);
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-pink-50/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Game Selection Screen
  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-pink-50/30 pb-32 pt-6">
        <SubmoduleHeader
          title="Mini Games"
          subtitle={story.title}
          icon={Gamepad2}
          gradientFrom="#8B5CF6"
          gradientTo="#EC4899"
          backHref={`/learn/verse/${storyId}/quiz`}
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
                Mainkan game seru untuk lebih memahami cerita {story.title}
              </p>
            </div>

            {/* Game Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Game 1: Matching */}
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGameSelection("matching")}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 text-left hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Puzzle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  Cocokkan Tokoh
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Cocokkan tokoh dengan deskripsi yang tepat
                </p>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.button>

              {/* Game 2: Sequencing */}
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGameSelection("sequencing")}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 text-left hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <ListOrdered className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  Urutkan Cerita
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Susun scene cerita sesuai urutan yang benar
                </p>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.button>

              {/* Game 3: Word Hunt */}
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGame("word-hunt")}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 text-left hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  Cari Kata
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Temukan kata-kata tersembunyi dari cerita
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
            "Pilih game yang kamu suka! Semua game seru kok! 🎮",
            "Jangan khawatir, game ini mudah kok. Aku akan bantu! 😊",
          ]}
          autoGreet={true}
        />

        <GlassFooter />
      </div>
    );
  }

  // Matching Game Screen
  if (selectedGame === "matching") {
    const allMatched = correctMatches === matchingPairs.length;

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
          title="Cocokkan Tokoh"
          subtitle={`${correctMatches}/${matchingPairs.length} cocok • ${attempts} percobaan`}
          icon={Puzzle}
          gradientFrom="#3B82F6"
          gradientTo="#06B6D4"
          backHref={`/learn/verse/${storyId}/games`}
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
                  Klik nama tokoh, lalu klik deskripsi yang sesuai! 👆
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Characters Column */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 text-center">
                    Tokoh Cerita
                  </h3>
                  {matchingPairs.map((pair) => (
                    <motion.button
                      key={`char-${pair.id}`}
                      whileHover={!pair.matched ? { scale: 1.03 } : {}}
                      whileTap={!pair.matched ? { scale: 0.97 } : {}}
                      onClick={() => handleCharacterSelect(pair.id)}
                      disabled={pair.matched}
                      className={`w-full p-4 rounded-2xl font-bold text-lg transition-all ${
                        pair.matched
                          ? "bg-green-100 border-2 border-green-500 text-green-900 cursor-not-allowed"
                          : selectedCharacter === pair.id
                          ? "bg-blue-500 text-white shadow-lg scale-105"
                          : "bg-white hover:bg-blue-50 text-gray-800 shadow-md"
                      }`}
                    >
                      {pair.character}
                      {pair.matched && <span className="ml-2">✓</span>}
                    </motion.button>
                  ))}
                </div>

                {/* Descriptions Column */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 text-center">
                    Deskripsi
                  </h3>
                  {matchingPairs
                    .map((pair, idx) => ({ ...pair, originalId: idx }))
                    .sort(() => Math.random() - 0.5)
                    .map((pair) => (
                      <motion.button
                        key={`desc-${pair.id}`}
                        whileHover={!pair.matched ? { scale: 1.03 } : {}}
                        whileTap={!pair.matched ? { scale: 0.97 } : {}}
                        onClick={() => handleDescriptionSelect(pair.originalId)}
                        disabled={pair.matched}
                        className={`w-full p-4 rounded-2xl text-sm transition-all text-left ${
                          pair.matched
                            ? "bg-green-100 border-2 border-green-500 text-green-900 cursor-not-allowed"
                            : selectedDescription === pair.originalId
                            ? "bg-cyan-500 text-white shadow-lg scale-105"
                            : "bg-white hover:bg-cyan-50 text-gray-700 shadow-md"
                        }`}
                      >
                        {pair.description}
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
                  Kamu berhasil mencocokkan semua tokoh!
                </p>
                <div className="text-4xl font-bold text-blue-600">
                  {attempts} percobaan
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={resetMatchingGame}
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
            "Baca deskripsinya dengan teliti ya! 📖",
            "Ingat-ingat lagi karakteristik setiap tokoh! 🤔",
            "Jangan buru-buru, pikirkan baik-baik! 💭",
          ]}
          autoGreet={false}
        />

        <GlassFooter />
      </div>
    );
  }

  // Story Sequencing Game Screen
  if (selectedGame === "sequencing") {
    const sortedScenes = [...sceneCards].sort((a, b) => a.currentOrder - b.currentOrder);

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-pink-50/50 pb-32 pt-6">
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
          title="Urutkan Cerita"
          subtitle={`${sequencingAttempts} gerakan`}
          icon={ListOrdered}
          gradientFrom="#A855F7"
          gradientTo="#EC4899"
          backHref={`/learn/verse/${storyId}/games`}
        />

        <main className="max-w-3xl mx-auto px-4 py-6">
          {!sequencingComplete ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
                <p className="text-gray-700 font-medium">
                  Klik 2 kartu untuk menukar posisinya. Susun sesuai urutan cerita! 🔄
                </p>
              </div>

              {/* Scene Cards */}
              <div className="space-y-4">
                {sortedScenes.map((scene, displayIdx) => (
                  <motion.button
                    key={scene.id}
                    layout
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSceneClick(scene.currentOrder)}
                    className={`w-full text-left p-5 rounded-2xl transition-all ${
                      selectedScene === scene.currentOrder
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl scale-105"
                        : "bg-white hover:bg-purple-50 text-gray-800 shadow-lg"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                          selectedScene === scene.currentOrder
                            ? "bg-white/20 text-white"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {displayIdx + 1}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-bold text-lg mb-2 ${
                            selectedScene === scene.currentOrder
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {scene.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            selectedScene === scene.currentOrder
                              ? "text-white/90"
                              : "text-gray-600"
                          }`}
                        >
                          {scene.content}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={checkSequencingOrder}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  Periksa Urutan
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCorrectOrder(!showCorrectOrder)}
                  className={`w-full font-semibold py-3 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 ${
                    showCorrectOrder
                      ? "bg-amber-500 text-white"
                      : "bg-white/80 text-gray-700 hover:bg-white"
                  }`}
                >
                  <Lightbulb className="w-5 h-5" />
                  {showCorrectOrder ? "Sembunyikan Urutan" : "Lihat Urutan yang Benar"}
                </motion.button>

                {/* Show correct order hint */}
                {showCorrectOrder && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-sm"
                  >
                    <p className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Urutan yang Benar:
                    </p>
                    <ol className="space-y-1 text-amber-800">
                      {sceneCards
                        .sort((a, b) => a.correctOrder - b.correctOrder)
                        .map((scene, idx) => (
                          <li key={scene.id} className="flex items-start gap-2">
                            <span className="font-bold">{idx + 1}.</span>
                            <span>{scene.title}</span>
                          </li>
                        ))}
                    </ol>
                  </motion.div>
                )}
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
                <Trophy className="w-20 h-20 text-purple-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Sempurna! 🎉
                </h2>
                <p className="text-gray-600 mb-4">
                  Kamu berhasil mengurutkan cerita dengan benar!
                </p>
                <div className="text-4xl font-bold text-purple-600">
                  {sequencingAttempts} gerakan
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={resetSequencingGame}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
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
            "Ingat urutan cerita yang kamu baca! 📚",
            "Mulai dari scene awal sampai akhir cerita! 🎬",
            "Baca judul dan isi setiap kartu dengan teliti! 👀",
          ]}
          autoGreet={false}
        />

        <GlassFooter />
      </div>
    );
  }

  // Word Hunt game (placeholder for now)
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-emerald-50/50 pb-32 pt-6 flex items-center justify-center">
      <div className="text-center">
        <Gamepad2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Game Sedang Dikembangkan
        </h2>
        <p className="text-gray-600 mb-6">Game ini akan segera tersedia!</p>
        <button
          onClick={() => setSelectedGame(null)}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          Kembali ke Menu
        </button>
      </div>
    </div>
  );
}
