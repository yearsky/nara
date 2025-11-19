import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - warm cultural aesthetic
        brand: {
          primary: '#C2410C',      // Terracotta
          light: '#EA580C',        // Lighter terracotta
          dark: '#9A3412',         // Darker terracotta
          accent: '#F59E0B',       // Amber
        },

        // Module-specific colors (for gradients)
        module: {
          aksara: {
            from: '#3B82F6',       // Blue-500
            to: '#1D4ED8',         // Blue-700
          },
          verse: {
            from: '#8B5CF6',       // Purple-500
            to: '#6D28D9',         // Purple-700
          },
          symphony: {
            from: '#EC4899',       // Pink-500
            to: '#BE185D',         // Pink-700
          },
          map: {
            from: '#10B981',       // Green-500
            to: '#059669',         // Green-700
          },
          loka: {
            from: '#F59E0B',       // Amber-500
            to: '#D97706',         // Amber-700
          },
          pola: {
            from: '#14B8A6',       // Teal-500
            to: '#0D9488',         // Teal-700
          },
        },

        background: {
          main: '#FFF8F3',         // Warm white
          card: '#FFFFFF',
        },

        character: {
          bg: {
            start: '#FFD4BA',      // Peach
            end: '#FFB88C',        // Light orange
          },
        },

        // Legacy colors (keep for backward compatibility)
        nusantara: {
          jawa: {
            primary: "#8B4513",
            secondary: "#D4AF37",
            accent: "#2C5F2D",
          },
          sunda: {
            primary: "#2C5F2D",
            secondary: "#97BC62",
            accent: "#F4A460",
          },
          bali: {
            primary: "#FFD700",
            secondary: "#DC143C",
            accent: "#000080",
          },
          batak: {
            primary: "#000080",
            secondary: "#FF6347",
            accent: "#FFFFFF",
          },
        },
        foreground: "#1f2937",
        border: "#e5e7eb",
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        'character': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 20px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
export default config;

