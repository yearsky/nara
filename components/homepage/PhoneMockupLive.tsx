'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function PhoneMockupLive() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  const handlePhoneClick = () => {
    router.push('/chat');
  };

  return (
    <div className="flex items-center justify-center">
      {/* iPhone Mockup Container */}
      <motion.div
        className="relative cursor-pointer will-change-transform"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        onClick={handlePhoneClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        {/* Hover Hint */}
        <motion.div
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-xl"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
          transition={{ duration: 0.2 }}
        >
          <span className="flex items-center gap-2">
            Tap to start chatting
            <ArrowUpRight className="w-4 h-4" />
          </span>
          {/* Arrow pointer */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900" />
        </motion.div>

        {/* iPhone Frame */}
        <motion.div
          className="relative w-[280px] md:w-[300px] lg:w-[320px] h-[560px] md:h-[600px] lg:h-[640px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl"
          whileHover={{
            boxShadow:
              '0 25px 50px -12px rgba(194, 65, 12, 0.25), 0 20px 40px -15px rgba(255, 122, 92, 0.3)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10" />

          {/* Screen */}
          <div className="relative w-full h-full bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 rounded-[2.5rem] overflow-hidden">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 pt-2 z-20">
              <span className="text-xs font-semibold text-gray-700">9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-3 border border-gray-700 rounded-sm relative">
                  <div className="absolute inset-0.5 bg-gray-700 rounded-sm" />
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="absolute inset-0 flex flex-col pt-16 pb-6 px-4">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  {/* Avatar with Pulse Rings */}
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#C2410C] to-[#FF7A5C] flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />

                    {/* Continuous Breathing Pulse Rings */}
                    {[1, 2, 3].map((ring) => (
                      <motion.div
                        key={ring}
                        className="absolute inset-0 rounded-full border-2 border-[#FF7A5C]"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{
                          scale: [1, 1.8, 1.8],
                          opacity: [0.8, 0, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: ring * 0.4,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </div>

                  {/* Status Indicator - Pulsing Green Dot */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">Nara</h3>
                  <motion.p
                    className="text-xs text-green-600 font-semibold"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Online
                  </motion.p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 space-y-3 overflow-hidden">
                {/* Message from Nara */}
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[80%]">
                    <p className="text-sm text-gray-800">
                      {t('chat.greeting')}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[80%]">
                    <p className="text-sm text-gray-800">
                      {t('chat.question')}
                    </p>
                  </div>
                </motion.div>

                {/* Typing Indicator */}
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{
                            y: [0, -6, 0],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Input Bar */}
              <div className="mt-4 flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-md">
                <MessageCircle className="w-5 h-5 text-gray-400" />
                <div className="flex-1 text-sm text-gray-400">{t('chat.placeholder')}</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C2410C] to-[#FF7A5C] flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Shimmer Effect on Hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              animate={{ x: isHovered ? '200%' : '-100%' }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Side Buttons */}
          <div className="absolute right-0 top-24 w-1 h-12 bg-gray-800 rounded-l-sm" />
          <div className="absolute right-0 top-40 w-1 h-16 bg-gray-800 rounded-l-sm" />
          <div className="absolute left-0 top-32 w-1 h-8 bg-gray-800 rounded-r-sm" />
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 -z-10 blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, #FF7A5C 0%, transparent 70%)',
          }}
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.4 : 0.3,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
}
