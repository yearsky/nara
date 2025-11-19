'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  BookOpen,
  UtensilsCrossed,
  Music,
  BookText,
  Languages as LanguagesIcon,
  Palette,
  Menu,
  X,
  User,
  Globe,
} from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { useLanguage } from '@/contexts/LanguageContext';

const navLinks = [
  { key: 'nav.museum', href: '/museum', icon: Building2 },
  { key: 'nav.learn', href: '/learn', icon: BookOpen },
  { key: 'nav.loka', href: '/learn/loka', icon: UtensilsCrossed },
  { key: 'nav.symphony', href: '/learn/symphony', icon: Music },
  { key: 'nav.verse', href: '/learn/verse', icon: BookText },
  { key: 'nav.aksara', href: '/learn/aksara', icon: LanguagesIcon },
  { key: 'nav.pola', href: '/learn/pola', icon: Palette },
];

export function HomeHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = (lang: 'id' | 'en') => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <>
      {/* Header with Transparent Glass */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C2410C] to-[#FF7A5C] flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white font-bold text-xl">N</span>
              </motion.div>
              <span className="font-serif font-bold text-2xl text-gray-900 group-hover:text-[#FF7A5C] transition-colors">
                Nara.ai
              </span>
            </Link>

            {/* Desktop Navigation - Glass Container */}
            <nav className="hidden lg:block">
              <div className="flex items-center gap-3">
                {/* Navigation Links Group - Glass Container */}
                <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`relative group px-4 py-2 rounded-full transition-all ${
                          isActive ? 'bg-white/80 shadow-md' : 'hover:bg-white/50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon
                            className={`w-4 h-4 ${
                              isActive ? 'text-[#FF7A5C]' : 'text-gray-600 group-hover:text-[#FF7A5C]'
                            } transition-colors`}
                          />
                          <span
                            className={`text-sm font-semibold ${
                              isActive ? 'text-[#FF7A5C]' : 'text-gray-700 group-hover:text-[#FF7A5C]'
                            } transition-colors`}
                          >
                            {t(link.key)}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Language Switcher - Glass Container */}
                <div className="relative">
                  <motion.button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg hover:bg-white/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Globe className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-semibold text-gray-700 uppercase">
                      {language}
                    </span>
                  </motion.button>

                  {/* Language Dropdown */}
                  <AnimatePresence>
                    {showLangMenu && (
                      <>
                        {/* Backdrop */}
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setShowLangMenu(false)}
                        />

                        {/* Dropdown Menu */}
                        <motion.div
                          className="absolute top-full right-0 mt-2 w-32 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-xl overflow-hidden z-50"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button
                            onClick={() => toggleLanguage('id')}
                            className={`w-full px-4 py-3 text-left text-sm font-semibold transition-all ${
                              language === 'id'
                                ? 'bg-gradient-to-r from-[#C2410C] to-[#FF7A5C] text-white'
                                : 'text-gray-700 hover:bg-white/50'
                            }`}
                          >
                            🇮🇩 Indonesia
                          </button>
                          <button
                            onClick={() => toggleLanguage('en')}
                            className={`w-full px-4 py-3 text-left text-sm font-semibold transition-all ${
                              language === 'en'
                                ? 'bg-gradient-to-r from-[#C2410C] to-[#FF7A5C] text-white'
                                : 'text-gray-700 hover:bg-white/50'
                            }`}
                          >
                            🇬🇧 English
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Dashboard Button - Glass Container */}
                <Link href="/dashboard">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg hover:bg-white/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <User className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-semibold text-gray-700">
                      {t('nav.dashboard')}
                    </span>
                  </motion.button>
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button - Glass Container */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Language Switcher Mobile */}
              <motion.button
                onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4 text-gray-700" />
                <span className="text-xs font-bold text-gray-700 uppercase">{language}</span>
              </motion.button>

              {/* Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg hover:bg-white/50 transition-all"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
