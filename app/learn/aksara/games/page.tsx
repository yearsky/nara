"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Gamepad2, Puzzle, Trophy, Star, ArrowLeft } from "lucide-react";
import SubmoduleHeader from "@/components/learn/SubmoduleHeader";
import GlassFooter from "@/components/learn/GlassFooter";
import NaraAssistant from "@/components/learn/NaraAssistant";
import { GameWinCelebration } from "@/components/learn/ConfettiCelebration";
import { aksaraGameData } from "@/lib/aksaraQuizData";

type GameType = "matching-script" | null;

interface MatchingPair {
  id: number;
  name: string;
  answer: string;
  matched: boolean;
}

export default function AksaraGamesPage() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [scriptPairs, setScriptPairs] = useState<MatchingPair[]>([]);
  const [selectedScript, setSelectedScript] = useState<number | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<number | null>(null);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    initScriptGame();
  }, []);

  const initScriptGame = () => {
    const pairs: MatchingPair[] = aksaraGameData.scripts.map((script, idx) => ({
      id: idx,
      name: script.name,
      answer: script.origin,
      matched: false,
    }));
    setScriptPairs(pairs);
  };

  const handleScriptSelect = (id: number) => {
    if (scriptPairs[id].matched) return;
    setSelectedScript(id);
    if (selectedOrigin !== null) checkScriptMatch(id, selectedOrigin);
  };

  const handleOriginSelect = (id: number) => {
    if (scriptPairs[id].matched) return;
    setSelectedOrigin(id);
    if (selectedScript !== null) checkScriptMatch(selectedScript, id);
  };

  const checkScriptMatch = (scriptId: number, originId: number) => {
    setAttempts(attempts + 1);
    if (scriptId === originId) {
      const newPairs = [...scriptPairs];
      newPairs[scriptId].matched = true;
      setScriptPairs(newPairs);
      setCorrectMatches(correctMatches + 1);
      if (correctMatches + 1 === scriptPairs.length) {
        setTimeout(() => setShowCelebration(true), 500);
      }
    }
    setTimeout(() => {
      setSelectedScript(null);
      setSelectedOrigin(null);
    }, 1000);
  };

  const resetScriptGame = () => {
    initScriptGame();
    setSelectedScript(null);
    setSelectedOrigin(null);
    setCorrectMatches(0);
    setAttempts(0);
    setShowCelebration(false);
  };

  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-indigo-50/30 pb-32 pt-6">
        <SubmoduleHeader title="Mini Games" subtitle="Nara Aksara" icon={Gamepad2} gradientFrom="#3B82F6" gradientTo="#4F46E5" backHref="/learn/aksara" />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Game yang Ingin Kamu Mainkan!</h2>
              <p className="text-gray-600">Uji pengetahuanmu tentang aksara nusantara</p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <motion.button whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedGame("matching-script")} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 text-left hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Puzzle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Cocokkan Aksara</h3>
                <p className="text-sm text-gray-600 text-center">Cocokkan aksara dengan daerah asalnya</p>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.button>
            </div>
          </motion.div>
        </main>
        <NaraAssistant context="game" hints={["Ayo mainkan game tentang aksara nusantara! ✍️"]} autoGreet={true} />
        <GlassFooter />
      </div>
    );
  }

  const allMatched = correctMatches === scriptPairs.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-indigo-50/50 pb-32 pt-6">
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <button onClick={() => setSelectedGame(null)} className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-2xl shadow-md hover:bg-white transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold text-gray-700">Kembali ke Menu</span>
        </button>
      </div>
      <SubmoduleHeader title="Cocokkan Aksara" subtitle={`${correctMatches}/${scriptPairs.length} cocok • ${attempts} percobaan`} icon={Puzzle} gradientFrom="#3B82F6" gradientTo="#4F46E5" backHref="/learn/aksara" />
      <main className="max-w-4xl mx-auto px-4 py-6">
        {!allMatched ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
              <p className="text-gray-700 font-medium">Klik nama aksara, lalu klik daerah asalnya! ✍️</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-lg mb-3 text-center">Aksara</h3>
                {scriptPairs.map((pair) => (
                  <motion.button key={`script-${pair.id}`} whileHover={!pair.matched ? { scale: 1.03 } : {}} whileTap={!pair.matched ? { scale: 0.97 } : {}} onClick={() => handleScriptSelect(pair.id)} disabled={pair.matched} className={`w-full p-4 rounded-2xl font-bold text-lg transition-all ${pair.matched ? "bg-green-100 border-2 border-green-500 text-green-900 cursor-not-allowed" : selectedScript === pair.id ? "bg-blue-500 text-white shadow-lg scale-105" : "bg-white hover:bg-blue-50 text-gray-800 shadow-md"}`}>
                    {pair.name}{pair.matched && <span className="ml-2">✓</span>}
                  </motion.button>
                ))}
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-lg mb-3 text-center">Daerah Asal</h3>
                {scriptPairs.map((pair, idx) => ({ ...pair, originalId: idx })).sort(() => Math.random() - 0.5).map((pair) => (
                  <motion.button key={`origin-${pair.id}`} whileHover={!pair.matched ? { scale: 1.03 } : {}} whileTap={!pair.matched ? { scale: 0.97 } : {}} onClick={() => handleOriginSelect(pair.originalId)} disabled={pair.matched} className={`w-full p-4 rounded-2xl text-sm transition-all text-left ${pair.matched ? "bg-green-100 border-2 border-green-500 text-green-900 cursor-not-allowed" : selectedOrigin === pair.originalId ? "bg-indigo-500 text-white shadow-lg scale-105" : "bg-white hover:bg-indigo-50 text-gray-700 shadow-md"}`}>
                    {pair.answer}{pair.matched && <span className="ml-2">✓</span>}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat! 🎉</h2>
              <p className="text-gray-600 mb-4">Kamu berhasil mencocokkan semua aksara!</p>
              <div className="text-4xl font-bold text-blue-600">{attempts} percobaan</div>
              <div className="mt-6 space-y-3">
                <button onClick={resetScriptGame} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">Main Lagi</button>
                <button onClick={() => setSelectedGame(null)} className="w-full bg-white/80 text-gray-700 font-semibold py-4 px-6 rounded-2xl shadow-md hover:bg-white transition-all">Pilih Game Lain</button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
      <GameWinCelebration show={showCelebration} />
      <NaraAssistant context="game" hints={["Ingat aksara dari setiap daerah! ✍️", "Hanacaraka dari Jawa, Lontara dari Bugis! 🗺️"]} autoGreet={false} />
      <GlassFooter />
    </div>
  );
}
