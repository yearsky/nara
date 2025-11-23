'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Heart, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function HeadlineBlock() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleCTA = () => {
    // Check if user has completed onboarding
    if (typeof window !== "undefined") {
      const hasCompletedOnboarding = localStorage.getItem(
        "nara-onboarding-completed"
      );
      if (hasCompletedOnboarding) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    } else {
      router.push("/onboarding");
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center space-y-6 lg:space-y-8"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Main Headline with Gradient */}
      <div className="space-y-4">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span
            className="italic block mb-2"
            style={{
              background: 'linear-gradient(135deg, #C2410C 0%, #FF7A5C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('home.title')}
          </span>
          <span className="text-gray-900 block text-4xl md:text-5xl lg:text-5xl">
            {t('home.subtitle1')}
          </span>
          <span className="text-gray-900 block text-4xl md:text-5xl lg:text-5xl">
            {t('home.subtitle2')}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-md leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t('home.description')}
        </motion.p>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="cta-button"
      >
        <motion.button
          onClick={handleCTA}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #C2410C 0%, #FF7A5C 100%)',
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 text-white">{t('home.cta')}</span>
          <motion.div
            className="relative z-10"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </motion.div>

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </motion.div>

      {/* Feature Pills */}
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {[
          { icon: Sparkles, key: 'feature.ai', color: 'from-amber-500 to-orange-500' },
          { icon: Heart, key: 'feature.cultural', color: 'from-rose-500 to-pink-500' },
          { icon: BookOpen, key: 'feature.learning', color: 'from-blue-500 to-cyan-500' },
        ].map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.key}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`p-1.5 rounded-full bg-gradient-to-br ${feature.color}`}>
                <Icon className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700">{t(feature.key)}</span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        className="flex items-center gap-2 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold"
            >
              {String.fromCharCode(64 + i)}
            </div>
          ))}
        </div>
        <span className="font-medium">
          {t('feature.trusted')} <span className="font-bold text-[#FF7A5C]">10,000+</span> {t('feature.users')}
        </span>
      </motion.div>
    </motion.div>
  );
}
