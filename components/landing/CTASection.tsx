"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles, ArrowRight, Zap, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CTASection() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleStartVideoCall = () => {
    // Redirect to dedicated full-screen video call page
    router.push("/chat");
  };

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
                "🎥 Video Call",
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

            {/* CTA Button - Video Call */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={handleStartVideoCall}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-5 bg-white text-brand-primary rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all overflow-hidden"
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-light/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? "200%" : "-100%" }}
                  transition={{ duration: 0.8 }}
                />

                {/* Button Content */}
                <div className="relative flex items-center gap-3">
                  <Video className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span>Tanya Nara</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 -z-10 bg-white opacity-0 blur-xl"
                  animate={{
                    opacity: isHovered ? 0.5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>

            {/* Info Text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-white/70 text-sm"
            >
              💡 <span className="font-semibold">Full-screen immersive experience</span> dengan Nara AI companion
            </motion.p>
          </motion.div>

          {/* Trust Badges */}
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
        </div>
      </div>
    </section>
  );
}
