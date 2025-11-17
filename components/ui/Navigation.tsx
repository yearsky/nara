"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

interface NavigationProps {
  items: NavItem[];
  onNavigate?: (href: string) => void;
}

export const Navigation = ({ items, onNavigate }: NavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item, index) => (
          <motion.button
            key={item.href}
            onClick={() => onNavigate?.(item.href)}
            className={clsx(
              "flex flex-col items-center justify-center gap-1 flex-1 h-full",
              item.active && "text-[#8B4513]"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
            {item.active && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B4513]"
                layoutId="activeTab"
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
};

