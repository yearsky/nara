"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles, ArrowRight, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamic import untuk NaraChatBox
const NaraChatBox = dynamic(
  () => import("@/components/nara/NaraChatBox").then((mod) => ({ default: mod.NaraChatBox })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary" />
      </div>
    ),
  }
);

export function CTASection() {
  const [showChat, setShowChat] = useState(false);

  return (
    <section
      id="try-chat-section"
      className="py-24 bg-gradient-to-br from-brand-primary via-brand-light to-brand-accent relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Coba Gratis Sekarang
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Siap Ngobrol dengan Nara?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Tanya apa aja tentang budaya Indonesia, dari cerita rakyat sampai
              resep masakan tradisional. Nara siap bantuin kamu!
            </p>

            {/* Features List */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              {[
                "💬 Chat Real-time",
                "🎙️ Voice Input",
                "🤖 AI Powered",
                "🎨 Interactive",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm"
                >
                  {feature}
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            {!showChat && (
              <motion.button
                onClick={() => setShowChat(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 px-8 py-5 bg-white text-brand-primary rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
              >
                <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Mulai Chat Sekarang
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            )}
          </motion.div>

          {/* Chat Interface */}
          {showChat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-brand-primary to-brand-accent p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="https://ui-avatars.com/api/?name=Nara+AI&size=48&background=fff&color=C2410C&bold=true&format=svg"
                        alt="Nara"
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Nara AI</h3>
                      <p className="text-white/80 text-sm">
                        AI Cultural Companion
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Chat Content */}
                <div className="h-[500px]">
                  <NaraChatBox onCreditWarning={() => {}} />
                </div>

                {/* Chat Footer Info */}
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Sparkles className="w-4 h-4 text-brand-primary" />
                    <span>
                      Nara dapat membuat kesalahan. Mohon verifikasi informasi
                      penting.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Trust Badges */}
          {!showChat && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/80"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm">Gratis</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm">Tersedia</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Aman</div>
                <div className="text-sm">& Privasi</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Indonesia</div>
                <div className="text-sm">Fokus</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
