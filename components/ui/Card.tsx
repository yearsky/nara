"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <motion.div
      className={clsx(
        "bg-white rounded-xl shadow-md p-4 md:p-6",
        onClick && "cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

