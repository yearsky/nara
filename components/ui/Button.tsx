"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  type = "button",
}: ButtonProps) => {
  const baseStyles = "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-[#8B4513] text-white hover:bg-opacity-90 focus:ring-[#8B4513]",
    secondary: "bg-[#D4AF37] text-white hover:bg-opacity-90 focus:ring-[#D4AF37]",
    outline: "border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white focus:ring-[#8B4513]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm min-h-[36px]",
    md: "px-4 py-2 text-base min-h-[44px]",
    lg: "px-6 py-3 text-lg min-h-[52px]",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.button>
  );
};

