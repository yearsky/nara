"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useNaraEmotionStore } from "@/stores/naraEmotionStore";
import { cn } from "@/lib/utils";

// Dynamically import avatar components to reduce initial bundle size
const NaraAvatar = dynamic(
  () => import("./NaraAvatar").then((mod) => ({ default: mod.NaraAvatar })),
  { ssr: false }
);
const NaraVideoAvatar = dynamic(
  () => import("./NaraVideoAvatar").then((mod) => ({ default: mod.NaraVideoAvatar })),
  { ssr: false }
);

interface ChatVideoAreaProps {
  avatarType: "live2d" | "video";
  isMuted: boolean;
}

export default function ChatVideoArea({
  avatarType,
  isMuted,
}: ChatVideoAreaProps) {
  const { emotion, isSpeaking } = useNaraEmotionStore();
  const [showPulse, setShowPulse] = useState(false);

  // Show pulse animation when Nara is speaking
  useEffect(() => {
    setShowPulse(isSpeaking && !isMuted);
  }, [isSpeaking, isMuted]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200" />

      {/* Animated Circles Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-orange-300/40 to-amber-300/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-amber-300/40 to-orange-300/40 rounded-full blur-3xl"
        />
      </div>

      {/* Avatar Container */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
          }}
          className="relative"
        >
          {/* Pulse Ring Effect (when speaking) */}
          <AnimatePresence>
            {showPulse && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 -z-10"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.3,
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 -z-10"
                />
              </>
            )}
          </AnimatePresence>

          {/* Avatar Container with Shadow */}
          <div
            className={cn(
              "relative rounded-full overflow-hidden",
              "shadow-2xl shadow-orange-500/30",
              "w-[280px] h-[280px]",
              "sm:w-[320px] sm:h-[320px]",
              "md:w-[400px] md:h-[400px]",
              "lg:w-[480px] lg:h-[480px]",
              "border-4 border-white/50 backdrop-blur-sm"
            )}
          >
            {/* Render Avatar based on type */}
            {avatarType === "live2d" ? (
              <NaraAvatar className="w-full h-full" />
            ) : (
              <NaraVideoAvatar className="w-full h-full object-cover" />
            )}
          </div>

          {/* Emotion Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          >
            <span className="text-sm font-medium text-gray-700 capitalize">
              {emotion === "thinking" && "🤔 Berpikir..."}
              {emotion === "happy" && "😊 Senang"}
              {emotion === "curious" && "🧐 Penasaran"}
              {emotion === "encouraging" && "💪 Semangat!"}
              {emotion === "neutral" && "😌 Netral"}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Muted Indicator */}
      <AnimatePresence>
        {isMuted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
            <span className="text-sm font-medium">Dibisukan</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
