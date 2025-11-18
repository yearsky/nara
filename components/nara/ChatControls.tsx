"use client";

import { motion } from "framer-motion";
import { Mic, MicOff, Phone, Video, VideoOff } from "lucide-react";
import { useState } from "react";

interface ChatControlsProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onEndCall: () => void;
}

export default function ChatControls({
  isMuted,
  onToggleMute,
  onEndCall,
}: ChatControlsProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring", damping: 25, stiffness: 300 }}
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
    >
      <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-4 rounded-full shadow-2xl border border-gray-200/50">
        {/* Mute/Unmute Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleMute}
          className={`p-4 rounded-full transition-all duration-200 ${
            isMuted
              ? "bg-red-500 text-white shadow-lg shadow-red-500/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </motion.button>

        {/* End Call Button (Red) */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 135 }}
          whileTap={{ scale: 0.9 }}
          onClick={onEndCall}
          className="p-5 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl shadow-red-500/50 hover:shadow-2xl hover:shadow-red-500/60 transition-all duration-200"
          aria-label="End call"
        >
          <Phone className="w-7 h-7" />
        </motion.button>

        {/* Video On/Off Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`p-4 rounded-full transition-all duration-200 ${
            !isVideoOn
              ? "bg-red-500 text-white shadow-lg shadow-red-500/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          aria-label={isVideoOn ? "Turn off video" : "Turn on video"}
        >
          {isVideoOn ? (
            <Video className="w-6 h-6" />
          ) : (
            <VideoOff className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      {/* Control Labels (optional, shows on hover) */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity">
        <div className="bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
          Kontrol Panggilan
        </div>
      </div>
    </motion.div>
  );
}
