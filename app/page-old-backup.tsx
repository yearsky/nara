"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { CTASection } from "@/components/landing/CTASection";
import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import for FullScreenChat
const FullScreenChat = dynamic(() => import("@/components/nara/FullScreenChat"), {
  ssr: false,
});

export default function Home() {
  const { user } = useUserStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullScreenChat, setShowFullScreenChat] = useState(false);

  useEffect(() => {
    // Simulate auth check
    // For now, we'll show landing page for all users
    // In the future, implement proper auth logic here

    // Check if user wants to see landing page (for demo purposes)
    const showLanding = true; // Set to false to see old dashboard

    setIsAuthenticated(!showLanding);
    setIsLoading(false);
  }, [user]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-brand-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 font-semibold">Memuat Nara...</p>
        </div>
      </div>
    );
  }

  // For authenticated users, redirect to dashboard
  if (isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary mb-4">
              Selamat Datang Kembali!
            </h1>
            <p className="text-gray-600 mb-8">
              Kamu sudah login. Langsung ke dashboard untuk melanjutkan belajar.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Ke Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Landing page for non-authenticated users
  return (
    <main className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="font-heading font-bold text-xl text-gray-900">
                Nara.ai
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-brand-primary transition-colors font-semibold"
              >
                Fitur
              </a>
              <a
                href="#try-chat-section"
                className="text-gray-600 hover:text-brand-primary transition-colors font-semibold"
              >
                Coba Sekarang
              </a>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-brand-primary transition-colors font-semibold"
              >
                Dashboard
              </Link>
            </div>

            {/* CTA Button */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-4 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-lg text-sm"
            >
              Mulai Belajar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Feature Showcase */}
      <div id="features">
        <FeatureShowcase />
      </div>

      {/* CTA Section with Chat */}
      <CTASection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="font-heading font-bold text-xl">Nara.ai</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                AI companion yang membantu kamu belajar dan mengenal budaya
                Indonesia dengan cara yang menyenangkan dan interaktif.
              </p>
              <p className="text-gray-500 text-sm">
                © 2025 Nara.ai. All rights reserved.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold mb-4">Fitur</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/learn/map" className="hover:text-white transition-colors">
                    Nara Map
                  </Link>
                </li>
                <li>
                  <Link href="/learn/verse" className="hover:text-white transition-colors">
                    Nara Verse
                  </Link>
                </li>
                <li>
                  <Link href="/learn/aksara" className="hover:text-white transition-colors">
                    Aksara Nusantara
                  </Link>
                </li>
                <li>
                  <Link href="/learn/symphony" className="hover:text-white transition-colors">
                    Nara Symphony
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h3 className="font-bold mb-4">Hubungi Kami</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Full Screen Chat Modal - Can be triggered from anywhere */}
      <FullScreenChat
        isOpen={showFullScreenChat}
        onClose={() => setShowFullScreenChat(false)}
        avatarType="video"
      />
    </main>
  );
}
