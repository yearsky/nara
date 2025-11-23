'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Star, MessageCircle, Heart, Sparkles, BookOpen, Clock, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const avatarColors = [
  'from-rose-400 to-pink-500',
  'from-orange-400 to-amber-500',
  'from-cyan-400 to-blue-500',
  'from-purple-400 to-pink-500',
  'from-green-400 to-emerald-500',
];

export function SocialProofCard() {
  const { t } = useLanguage();

  const stats = [
    { icon: BookOpen, key: 'stats.culturalContent', value: '100+', color: 'from-blue-500 to-cyan-500' },
    {
      icon: Clock,
      key: 'stats.aiAvailable',
      value: '24/7',
      color: 'from-purple-500 to-pink-500',
    },
    { icon: Check, key: 'stats.openSource', value: '✓', color: 'from-green-500 to-emerald-500' },
  ];
  return (
    <motion.div
      className="flex flex-col justify-center space-y-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
    >
      {/* Avatar Stack Section */}
      <motion.div
        className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-gray-200/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="flex -space-x-3">
            {avatarColors.map((color, index) => (
              <motion.div
                key={index}
                className={`w-12 h-12 rounded-full border-3 border-white bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}
                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{
                  delay: 0.6 + index * 0.1,
                  duration: 0.4,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
              >
                <span className="text-white font-bold text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
              </motion.div>
            ))}
            {/* +More indicator */}
            <motion.div
              className="w-12 h-12 rounded-full border-3 border-white bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-md"
              initial={{ opacity: 0, scale: 0.5, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                delay: 0.6 + avatarColors.length * 0.1,
                duration: 0.4,
                type: 'spring',
                stiffness: 200,
              }}
              whileHover={{ scale: 1.15, zIndex: 10 }}
            >
              <span className="text-white font-bold text-xs">+5K</span>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + star * 0.05 }}
                >
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </motion.div>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">5.0</span>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            {t('stats.rated')}
          </p>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <div className="space-y-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.key}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-md border border-gray-200/50 hover:bg-white/80 transition-all group"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.7 + index * 0.15,
                duration: 0.5,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ scale: 1.02, x: -4 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.div>

                <div className="flex-1">
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-[#FF7A5C] transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">{t(stat.key)}</p>
                </div>

                {/* Sparkle decoration on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-4 h-4 text-[#FF7A5C]" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Testimonial Quote */}
      <motion.div
        className="bg-gradient-to-br from-[#C2410C] to-[#FF7A5C] rounded-2xl p-5 shadow-xl text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-start gap-2 mb-3">
          <Heart className="w-5 h-5 fill-white/90 text-white/90 flex-shrink-0 mt-1" />
          <p className="text-sm font-medium leading-relaxed italic">
            {t('testimonial.quote')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center">
            <span className="font-bold text-sm">A</span>
          </div>
          <div>
            <p className="font-bold text-sm">{t('testimonial.name')}</p>
            <p className="text-xs text-white/80">{t('testimonial.location')}</p>
          </div>
        </div>
      </motion.div>

      {/* Live Activity Indicator */}
      <motion.div
        className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-2 h-2 bg-green-500 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span className="text-xs font-semibold text-green-700">
          <span className="font-bold">234</span> {t('stats.learning')}
        </span>
      </motion.div>
    </motion.div>
  );
}
