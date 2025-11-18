"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minimize2, MessageSquare, Video } from "lucide-react";
import ChatVideoArea from "./ChatVideoArea";
import ChatControls from "./ChatControls";
import { NaraChatBox } from "./NaraChatBox";
import VideoCallLayout from "./VideoCallLayout";
import { cn } from "@/lib/utils";

interface FullScreenChatEnhancedProps {
  isOpen: boolean;
  onClose: () => void;
  avatarType?: "live2d" | "video";
  defaultMode?: "classic" | "videocall";
}

/**
 * Enhanced Full Screen Chat Component
 * Supports both classic WhatsApp-style layout and new full-screen video call interface
 */
export default function FullScreenChatEnhanced({
  isOpen,
  onClose,
  avatarType = "video",
  defaultMode = "videocall",
}: FullScreenChatEnhancedProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mode, setMode] = useState<"classic" | "videocall">(defaultMode);

  // Prevent body scroll when fullscreen chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle minimize
  const handleMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => {
      onClose();
      setIsMinimized(false);
    }, 300);
  };

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Toggle between modes
  const toggleMode = () => {
    setMode(prev => prev === "classic" ? "videocall" : "classic");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {mode === "videocall" ? (
            // New Video Call Interface
            <VideoCallLayout
              characterName="Nara"
              onEndCall={onClose}
            />
          ) : (
            // Classic WhatsApp-style Interface
            <>
              {/* Backdrop with blur effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                onClick={onClose}
              />

              {/* Full Screen Chat Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: isMinimized ? 0.8 : 1,
                  y: isMinimized ? 100 : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                }}
                className={cn(
                  "fixed inset-0 z-[101] flex flex-col",
                  "md:inset-4 md:rounded-3xl md:overflow-hidden",
                  "bg-gradient-to-br from-orange-50 via-white to-amber-50"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Floating Control Buttons */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  {/* Mode Toggle Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMode}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-orange-50 transition-colors"
                    aria-label="Toggle video call mode"
                    title="Switch to Video Call Mode"
                  >
                    <Video className="w-5 h-5 text-orange-600" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleMinimize}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                    aria-label="Minimize"
                  >
                    <Minimize2 className="w-5 h-5 text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </motion.button>
                </div>

                {/* Main Content Area - WhatsApp Style Layout */}
                <div className="flex flex-col h-full">
                  {/* Video/Avatar Area - Top 60-70% */}
                  <div className="flex-shrink-0 relative h-[60vh] md:h-[65vh]">
                    <ChatVideoArea avatarType={avatarType} isMuted={isMuted} />
                  </div>

                  {/* Chat Area - Bottom 30-40% */}
                  <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-sm border-t-2 border-orange-200/50">
                    <div className="flex-1 overflow-hidden h-full">
                      <NaraChatBox />
                    </div>
                  </div>

                  {/* Controls Overlay */}
                  <ChatControls
                    isMuted={isMuted}
                    onToggleMute={() => setIsMuted(!isMuted)}
                    onEndCall={onClose}
                  />
                </div>
              </motion.div>
            </>
          )}

          {/* Mode Toggle Floating Button (only in video call mode) */}
          {mode === "videocall" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMode}
              className="fixed top-4 left-4 z-[60] p-3 bg-white/20 backdrop-blur-md rounded-full shadow-lg hover:bg-white/30 transition-colors"
              aria-label="Switch to classic mode"
              title="Switch to Classic Chat"
            >
              <MessageSquare className="w-5 h-5 text-white" />
            </motion.button>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
