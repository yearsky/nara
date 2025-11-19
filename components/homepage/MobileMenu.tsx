'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, ChevronRight, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavLink {
  key: string;
  href: string;
  icon: LucideIcon;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C2410C] to-[#FF7A5C] flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">N</span>
                  </div>
                  <span className="font-serif font-bold text-xl text-gray-900">Nara.ai</span>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-4">
                <div className="space-y-2">
                  {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={`flex items-center justify-between p-4 rounded-xl transition-all group ${
                            isActive
                              ? 'bg-gradient-to-r from-[#C2410C] to-[#FF7A5C] text-white shadow-lg'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                isActive
                                  ? 'bg-white/20'
                                  : 'bg-gray-100 group-hover:bg-white group-hover:shadow-md'
                              } transition-all`}
                            >
                              <Icon
                                className={`w-5 h-5 ${
                                  isActive ? 'text-white' : 'text-[#FF7A5C]'
                                }`}
                              />
                            </div>
                            <span
                              className={`font-semibold ${
                                isActive ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {t(link.key)}
                            </span>
                          </div>
                          <ChevronRight
                            className={`w-5 h-5 ${
                              isActive
                                ? 'text-white'
                                : 'text-gray-400 group-hover:text-[#FF7A5C]'
                            } transition-colors`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* Footer - Profile/Dashboard Button */}
              <div className="p-6 border-t border-gray-200">
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white shadow-md group-hover:shadow-lg transition-all">
                      <User className="w-5 h-5 text-[#FF7A5C]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t('dashboard.title')}</p>
                      <p className="text-xs text-gray-600">{t('dashboard.subtitle')}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#FF7A5C] transition-colors" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
