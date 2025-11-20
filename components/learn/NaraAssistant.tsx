"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  MessageCircle,
  X,
  Lightbulb,
  Heart,
  BookOpen,
  Sparkles,
  Volume2,
  Move,
} from "lucide-react";
import Image from "next/image";

interface NaraMessage {
  id: string;
  type: "hint" | "encouragement" | "info" | "question";
  message: string;
  timestamp: number;
}

interface NaraAssistantProps {
  context?: "story" | "quiz" | "game";
  currentProgress?: number;
  onHintRequest?: () => void;
  hints?: string[];
  autoGreet?: boolean;
}

export default function NaraAssistant({
  context = "story",
  currentProgress = 0,
  onHintRequest,
  hints = [],
  autoGreet = true,
}: NaraAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<NaraMessage[]>([]);
  const [showBubble, setShowBubble] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bubblePosition, setBubblePosition] = useState<'left' | 'right'>('left');
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Auto greet on mount
  useEffect(() => {
    if (autoGreet) {
      const greetTimer = setTimeout(() => {
        addMessage({
          type: "info",
          message: getGreetingMessage(),
        });
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 5000);
      }, 2000);

      return () => clearTimeout(greetTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoGreet, context]);

  // Progress-based encouragement
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (currentProgress === 50) {
      addMessage({
        type: "encouragement",
        message: "Wah, kamu sudah setengah jalan! Hebat sekali! 🎉 Terus semangat ya!",
      });
      setShowBubble(true);
      timer = setTimeout(() => setShowBubble(false), 4000);
    } else if (currentProgress === 100) {
      addMessage({
        type: "encouragement",
        message: "Selamat! Kamu berhasil menyelesaikan semuanya! Kamu luar biasa! ⭐",
      });
      setShowBubble(true);
      timer = setTimeout(() => setShowBubble(false), 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProgress]);

  const getGreetingMessage = () => {
    const greetings = {
      story: "Halo! Aku Nara 👋 Aku akan menemanimu membaca cerita ini. Kalau ada yang tidak kamu mengerti, tanya aku ya!",
      quiz: "Halo! Aku Nara 👋 Aku akan membantumu mengerjakan quiz ini. Jangan khawatir, kamu pasti bisa!",
      game: "Halo! Aku Nara 👋 Mari bermain bersama! Jika kamu butuh bantuan, aku siap membantu!",
    };
    return greetings[context];
  };

  const addMessage = (msg: Omit<NaraMessage, "id" | "timestamp">) => {
    const newMessage: NaraMessage = {
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleHintRequest = () => {
    if (hints.length === 0) {
      addMessage({
        type: "hint",
        message: "Hmm, untuk bagian ini coba baca dengan lebih teliti ya! Perhatikan kata-kata pentingnya. 💡",
      });
    } else {
      const hint = hints[currentHintIndex % hints.length];
      addMessage({
        type: "hint",
        message: hint,
      });
      setCurrentHintIndex((prev) => prev + 1);
    }

    if (onHintRequest) {
      onHintRequest();
    }

    setShowBubble(false);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "encourage":
        addMessage({
          type: "encouragement",
          message: "Kamu pasti bisa! Aku percaya sama kamu! 💪 Jangan menyerah ya!",
        });
        break;
      case "explain":
        addMessage({
          type: "info",
          message: "Kalau ada kata yang sulit, klik kata tersebut untuk melihat artinya. Atau tanya aku langsung! 📚",
        });
        break;
      case "tips":
        addMessage({
          type: "info",
          message: "Tips: Baca perlahan dan bayangkan ceritanya dalam pikiran. Akan lebih mudah dimengerti! ✨",
        });
        break;
    }
  };

  const getMessageIcon = (type: NaraMessage["type"]) => {
    switch (type) {
      case "hint":
        return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case "encouragement":
        return <Heart className="w-4 h-4 text-pink-500" />;
      case "info":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "question":
        return <Sparkles className="w-4 h-4 text-purple-500" />;
    }
  };

  const lastMessage = messages[messages.length - 1];

  // Constraint to prevent middle placement
  const handleDragEnd = (event: any, info: any) => {
    if (typeof window === "undefined") return;

    const { point, offset } = info;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate actual position (initial bottom-24 right-4 = bottom-96px right-16px)
    // Position = initial position + offset
    const actualX = windowWidth - 16 - 64 + offset.x; // right-4 (16px) + width (64px)
    const actualY = windowHeight - 96 - 64 + offset.y; // bottom-24 (96px) + height (64px)

    // Define forbidden zone (center 40% of screen)
    const forbiddenLeft = windowWidth * 0.3;
    const forbiddenRight = windowWidth * 0.7;
    const forbiddenTop = windowHeight * 0.3;
    const forbiddenBottom = windowHeight * 0.7;

    let newOffsetX = offset.x;
    let newOffsetY = offset.y;

    // Check if in forbidden zone (center area)
    if (actualX > forbiddenLeft && actualX < forbiddenRight && actualY > forbiddenTop && actualY < forbiddenBottom) {
      // Calculate distances to each edge
      const distanceToLeft = actualX - forbiddenLeft;
      const distanceToRight = forbiddenRight - actualX;
      const distanceToTop = actualY - forbiddenTop;
      const distanceToBottom = forbiddenBottom - actualY;

      const minDistance = Math.min(distanceToLeft, distanceToRight, distanceToTop, distanceToBottom);

      // Snap to nearest edge - calculate new target position
      let targetX = actualX;
      let targetY = actualY;

      if (minDistance === distanceToLeft) {
        // Snap to left edge
        targetX = forbiddenLeft - 80;
      } else if (minDistance === distanceToRight) {
        // Snap to right edge
        targetX = forbiddenRight + 80;
      } else if (minDistance === distanceToTop) {
        // Snap to top edge
        targetY = forbiddenTop - 80;
      } else {
        // Snap to bottom edge
        targetY = forbiddenBottom + 80;
      }

      // Convert back to offset from initial position
      newOffsetX = targetX - (windowWidth - 16 - 64);
      newOffsetY = targetY - (windowHeight - 96 - 64);
    }

    // Determine bubble position based on horizontal location
    const finalX = windowWidth - 16 - 64 + newOffsetX;
    if (finalX < windowWidth / 2) {
      setBubblePosition('right');
    } else {
      setBubblePosition('left');
    }

    setPosition({ x: newOffsetX, y: newOffsetY });
  };

  return (
    <>
      {/* Drag Constraints Container */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" />

      {/* Floating Nara Button */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x: position.x, y: position.y }}
        className="fixed bottom-24 right-4 z-40 cursor-grab active:cursor-grabbing"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      >
        {/* Chat Bubble Preview */}
        <AnimatePresence>
          {showBubble && lastMessage && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: bubblePosition === 'left' ? 20 : -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: bubblePosition === 'left' ? 20 : -20, scale: 0.8 }}
              className={`absolute bottom-full mb-3 max-w-xs ${
                bubblePosition === 'left' ? 'right-0 mr-2' : 'left-0 ml-2'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl p-3 border-2 border-orange-200">
                <div className="flex items-start gap-2">
                  {getMessageIcon(lastMessage.type)}
                  <p className="text-sm text-gray-700 leading-snug">
                    {lastMessage.message}
                  </p>
                </div>
                {/* Arrow pointer - dynamic based on position */}
                <div className={`absolute -bottom-2 w-4 h-4 bg-white border-r-2 border-b-2 border-orange-200 transform rotate-45 ${
                  bubblePosition === 'left' ? 'right-6' : 'left-6'
                }`} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nara Avatar Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 shadow-2xl flex items-center justify-center border-4 border-white overflow-hidden group pointer-events-auto"
        >
          {/* Animated background pulse */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-orange-300 to-amber-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Nara Icon/Avatar */}
          <div className="relative z-10">
            <MessageCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>

          {/* Sparkle effect */}
          <motion.div
            className="absolute top-0 right-0 w-3 h-3"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Sparkles className="w-3 h-3 text-yellow-300 fill-yellow-300" />
          </motion.div>

          {/* Notification badge */}
          {!isOpen && showBubble && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white"
            >
              <span className="text-[10px] text-white font-bold">!</span>
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-24 right-4 w-80 max-w-[calc(100vw-2rem)] z-50"
          >
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-orange-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Nara</h3>
                    <p className="text-xs text-orange-100">Asisten Belajarmu</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Messages */}
              <div className="p-4 max-h-96 overflow-y-auto space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="w-8 h-8 text-orange-500" />
                    </div>
                    <p className="text-gray-500 text-sm">
                      Belum ada pesan. Klik tombol di bawah untuk minta bantuan!
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                        {getMessageIcon(msg.type)}
                      </div>
                      <div className="flex-1 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl rounded-tl-none p-3">
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Quick Actions */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-2">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Apa yang bisa Nara bantu?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleHintRequest}
                    className="flex items-center gap-2 px-3 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-xl transition-colors text-left"
                  >
                    <Lightbulb className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    <span className="text-xs font-medium text-yellow-900">
                      Minta Petunjuk
                    </span>
                  </button>
                  <button
                    onClick={() => handleQuickAction("encourage")}
                    className="flex items-center gap-2 px-3 py-2 bg-pink-100 hover:bg-pink-200 rounded-xl transition-colors text-left"
                  >
                    <Heart className="w-4 h-4 text-pink-600 flex-shrink-0" />
                    <span className="text-xs font-medium text-pink-900">
                      Semangat!
                    </span>
                  </button>
                  <button
                    onClick={() => handleQuickAction("explain")}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors text-left"
                  >
                    <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-xs font-medium text-blue-900">
                      Cara Baca
                    </span>
                  </button>
                  <button
                    onClick={() => handleQuickAction("tips")}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-100 hover:bg-purple-200 rounded-xl transition-colors text-left"
                  >
                    <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="text-xs font-medium text-purple-900">
                      Tips & Trik
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
