"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, Star, Heart, Zap } from "lucide-react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  delay: number;
  icon?: "star" | "heart" | "sparkle" | "trophy" | "zap";
}

interface ConfettiCelebrationProps {
  show: boolean;
  onComplete?: () => void;
  duration?: number;
  intensity?: "low" | "medium" | "high";
  message?: string;
}

const COLORS = [
  "#FFD700", // gold
  "#FF6B6B", // red
  "#4ECDC4", // teal
  "#45B7D1", // blue
  "#FFA07A", // orange
  "#98D8C8", // mint
  "#F7DC6F", // yellow
  "#BB8FCE", // purple
  "#85C1E2", // sky blue
  "#F8B739", // orange-yellow
];

const ICONS = ["star", "heart", "sparkle", "trophy", "zap"] as const;

export function ConfettiCelebration({
  show,
  onComplete,
  duration = 3000,  // Changed from 4000 to 3000 (3 seconds)
  intensity = "high",
  message = "Luar Biasa! 🎉",
}: ConfettiCelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!show) {
      setConfetti([]);
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    // Determine number of confetti pieces based on intensity
    const count = intensity === "low" ? 30 : intensity === "medium" ? 50 : 80;

    // Generate confetti pieces
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < count; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: -20,
        rotation: Math.random() * 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 15 + 10,
        delay: Math.random() * 0.5,
        icon: Math.random() > 0.5 ? ICONS[Math.floor(Math.random() * ICONS.length)] : undefined,
      });
    }
    setConfetti(pieces);

    // Auto cleanup after duration (3 seconds)
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration, intensity]);

  const handleClose = () => {
    setConfetti([]);
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  if (!isVisible) return null;

  const getIcon = (iconType: string, size: number) => {
    const iconProps = {
      className: "w-full h-full",
      fill: "currentColor",
    };

    switch (iconType) {
      case "star":
        return <Star {...iconProps} />;
      case "heart":
        return <Heart {...iconProps} />;
      case "sparkle":
        return <Sparkles {...iconProps} />;
      case "trophy":
        return <Trophy {...iconProps} />;
      case "zap":
        return <Zap {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] overflow-hidden"
        style={{ pointerEvents: 'none' }}
      >
        {/* Confetti pieces */}
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: `${piece.x}vw`,
              y: "-20vh",
              rotate: piece.rotation,
              opacity: 1,
            }}
            animate={{
              y: "120vh",
              rotate: piece.rotation + 360 * 3,
              opacity: [1, 1, 1, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: piece.delay,
              ease: "easeIn",
            }}
            style={{
              position: "absolute",
              width: piece.size,
              height: piece.size,
              color: piece.color,
            }}
          >
            {piece.icon ? (
              getIcon(piece.icon, piece.size)
            ) : (
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: piece.color }}
              />
            )}
          </motion.div>
        ))}

        {/* Celebration Message */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'auto' }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="bg-white/95 backdrop-blur-md rounded-3xl px-8 py-6 shadow-2xl border-4 border-yellow-400 cursor-pointer hover:scale-105 transition-transform"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-2">🎉</div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {message}
                </h2>
                <p className="text-xs text-gray-500 mt-2">Klik untuk menutup (otomatis dalam 3 detik)</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Sparkle burst from center */}
        <motion.div className="absolute inset-0 flex items-center justify-center">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * 30 * Math.PI) / 180) * 200,
                y: Math.sin((i * 30 * Math.PI) / 180) * 200,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
              className="absolute"
            >
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* Fireworks effect */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`firework-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 2) * 30}%`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 2, 3],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: 1,
              delay: i * 0.3,
              repeat: 2,
              repeatDelay: 0.5,
            }}
          >
            <div className="relative w-4 h-4">
              {[...Array(8)].map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute w-1 h-8 rounded-full"
                  style={{
                    backgroundColor: COLORS[j % COLORS.length],
                    transformOrigin: "bottom center",
                    rotate: `${j * 45}deg`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

// Preset celebration components for different scenarios
export function QuizSuccessCelebration({ show, onComplete }: { show: boolean; onComplete?: () => void }) {
  return (
    <ConfettiCelebration
      show={show}
      onComplete={onComplete}
      intensity="high"
      message="Quiz Selesai! 🎉"
    />
  );
}

export function PerfectScoreCelebration({ show, onComplete }: { show: boolean; onComplete?: () => void }) {
  return (
    <ConfettiCelebration
      show={show}
      onComplete={onComplete}
      intensity="high"
      message="Nilai Sempurna! 🌟"
      duration={5000}
    />
  );
}

export function GameWinCelebration({ show, onComplete }: { show: boolean; onComplete?: () => void }) {
  return (
    <ConfettiCelebration
      show={show}
      onComplete={onComplete}
      intensity="high"
      message="Kamu Menang! 🏆"
    />
  );
}

export function AchievementUnlocked({
  show,
  onComplete,
  achievementName,
}: {
  show: boolean;
  onComplete?: () => void;
  achievementName?: string;
}) {
  return (
    <ConfettiCelebration
      show={show}
      onComplete={onComplete}
      intensity="medium"
      message={achievementName || "Achievement Unlocked! 🏅"}
      duration={3000}
    />
  );
}

// Also export as default for backward compatibility
export default ConfettiCelebration;
