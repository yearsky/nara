"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SubmoduleHeaderProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  backHref?: string;
  children?: React.ReactNode;
}

export default function SubmoduleHeader({
  title,
  subtitle,
  icon: Icon,
  gradientFrom,
  gradientTo,
  backHref = "/learn",
  children,
}: SubmoduleHeaderProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detect scroll position and direction
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Compact header after scrolling down 50px
          setIsScrolled(currentScrollY > 50);

          // Hide header when scrolling down, show when scrolling up
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsHidden(true);
          } else if (currentScrollY < lastScrollY) {
            setIsHidden(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      className="sticky top-0 z-40 px-4 md:px-6 pt-2"
      animate={{
        y: isHidden ? -120 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Glass morphism container */}
        <motion.div
          className="backdrop-blur-xl bg-white/90 rounded-3xl shadow-xl border border-white/30 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}15 0%, ${gradientTo}10 100%)`,
          }}
          animate={{
            opacity: isHidden ? 0 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <AnimatePresence mode="wait">
            {isScrolled ? (
              /* Scrolled State - Compact */
              <motion.div
                key="compact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-3"
              >
                <div className="flex items-center gap-2">
                  {/* Back Button */}
                  <button
                    onClick={() => router.push(backHref)}
                    className="flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Additional Content (Search, Stats, etc) */}
                  {children && (
                    <div className="flex-1">
                      {children}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Default State - Full */
              <motion.div
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 md:p-5"
              >
                {/* Top Row - Back button and Icon */}
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => router.push(backHref)}
                    className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm hidden sm:inline">
                      Kembali
                    </span>
                  </button>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Title Section */}
                <div className="text-center mb-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-1">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-sm md:text-base text-stone-600">
                      {subtitle}
                    </p>
                  )}
                </div>

                {/* Additional Content */}
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.header>
  );
}
