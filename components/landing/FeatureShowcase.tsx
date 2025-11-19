"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  BookOpen,
  Users,
  Music,
  PenTool,
  ChefHat,
  Grid3x3,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Nara Map",
    description: "Jelajahi 100+ museum dan situs warisan budaya Indonesia dengan peta interaktif",
    gradient: "from-green-500 to-emerald-600",
    image: "https://picsum.photos/seed/museum/400/300",
    badge: "Populer",
    stats: "100+ Lokasi",
    href: "/learn/map",
  },
  {
    icon: BookOpen,
    title: "Nara Verse",
    description: "Baca 1000+ cerita rakyat, legenda, dan dongeng dari seluruh Nusantara",
    gradient: "from-purple-500 to-purple-700",
    image: "https://picsum.photos/seed/stories/400/300",
    badge: "Terbaru",
    stats: "1000+ Cerita",
    href: "/learn/verse",
  },
  {
    icon: PenTool,
    title: "Aksara Nusantara",
    description: "Pelajari 8+ aksara tradisional Indonesia dengan cara yang menyenangkan",
    gradient: "from-blue-500 to-blue-700",
    image: "https://picsum.photos/seed/aksara/400/300",
    badge: null,
    stats: "8+ Aksara",
    href: "/learn/aksara",
  },
  {
    icon: Music,
    title: "Nara Symphony",
    description: "Dengarkan dan pelajari musik tradisional dari berbagai daerah",
    gradient: "from-pink-500 to-rose-600",
    image: "https://picsum.photos/seed/music/400/300",
    badge: null,
    stats: "50+ Lagu",
    href: "/learn/symphony",
  },
  {
    icon: ChefHat,
    title: "Nara Loka",
    description: "Masak resep tradisional Indonesia dengan panduan step-by-step",
    gradient: "from-amber-500 to-orange-600",
    image: "https://picsum.photos/seed/food/400/300",
    badge: "Segera",
    stats: "200+ Resep",
    href: "/learn/loka",
  },
  {
    icon: Grid3x3,
    title: "Nara Pola",
    description: "Eksplorasi motif dan pola tradisional khas Nusantara",
    gradient: "from-teal-500 to-cyan-600",
    image: "https://picsum.photos/seed/pattern/400/300",
    badge: null,
    stats: "150+ Motif",
    href: "/learn/pola",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FeatureShowcase() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50/30 to-white" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary">
              Fitur Lengkap
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Belajar Budaya Indonesia
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
              Lebih Seru & Interaktif
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan berbagai cara menyenangkan untuk mengenal dan mempelajari
            kekayaan budaya Nusantara
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="block"
            >
              <motion.div
                variants={item}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 cursor-pointer"
              >
              {/* Badge */}
              {feature.badge && (
                <div className="absolute top-4 right-4 z-20">
                  <motion.div
                    className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-brand-primary shadow-lg border border-brand-primary/20"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    {feature.badge}
                  </motion.div>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats & CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
                    {feature.stats}
                  </span>
                  <motion.div
                    className="flex items-center gap-1 text-brand-primary font-semibold text-sm group-hover:gap-2 transition-all"
                    whileHover={{ x: 4 }}
                  >
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br ${feature.gradient} blur-2xl -z-10`}
                style={{ transform: "translate(0, 100%)" }}
              />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Dan masih banyak fitur lainnya yang sedang dikembangkan!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            <Users className="w-5 h-5" />
            Gabung Komunitas Nara
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
