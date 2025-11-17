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
        background: "white",
        foreground: "#1f2937",
        border: "#e5e7eb",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

