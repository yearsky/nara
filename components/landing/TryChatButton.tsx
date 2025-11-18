"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

export function TryChatButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Scroll to chat section or open full-screen chat
    const chatSection = document.getElementById("try-chat-section");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative px-8 py-5 bg-gradient-to-r from-brand-primary via-brand-light to-brand-accent text-white rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Animated Background Shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "200%" : "-100%" }}
        transition={{ duration: 0.8 }}
      />

      {/* Button Content */}
      <div className="relative flex items-center gap-3">
        <motion.div
          animate={{
            rotate: isHovered ? [0, 10, -10, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.div>

        <span className="font-heading">Coba Chat dengan Nara</span>

        <motion.div
          animate={{
            x: isHovered ? 4 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <ArrowRight className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Floating Sparkles on Hover */}
      {isHovered && (
        <>
          <motion.div
            className="absolute top-2 right-8"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: -20 }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          </motion.div>
          <motion.div
            className="absolute bottom-2 left-8"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: 20 }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          >
            <Sparkles className="w-4 h-4 text-orange-300 fill-orange-300" />
          </motion.div>
        </>
      )}

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-primary via-brand-light to-brand-accent opacity-0 blur-xl"
        animate={{
          opacity: isHovered ? 0.7 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
