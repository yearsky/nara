'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Building2,
  BookOpen,
  UtensilsCrossed,
  Music,
  BookText,
  Languages,
  Palette,
  Menu,
  X,
  User,
} from 'lucide-react';
import { MobileMenu } from './MobileMenu';

const navLinks = [
  { label: 'Museum', href: '/museum', icon: Building2 },
  { label: 'Learn', href: '/learn', icon: BookOpen },
  { label: 'Loka', href: '/learn/loka', icon: UtensilsCrossed },
  { label: 'Symphony', href: '/learn/symphony', icon: Music },
  { label: 'Verse', href: '/learn/verse', icon: BookText },
  { label: 'Aksara', href: '/learn/aksara', icon: Languages },
  { label: 'Pola', href: '/learn/pola', icon: Palette },
];

export function HomeHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* Header with Glass Morphism */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative group px-4 py-2 rounded-lg transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF7A5C]' : 'text-gray-600 group-hover:text-[#FF7A5C]'} transition-colors`} />
                      <span className={`text-sm font-semibold ${isActive ? 'text-[#FF7A5C]' : 'text-gray-700 group-hover:text-[#FF7A5C]'} transition-colors`}>
                        {link.label}
                      </span>
                    </div>

                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C2410C] to-[#FF7A5C]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Profile Button */}
              <Link href="/dashboard">
                <motion.button
                  className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-semibold text-gray-700">Dashboard</span>
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
