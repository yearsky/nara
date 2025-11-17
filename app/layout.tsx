import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nara.ai - Belajar Budaya Indonesia",
  description: "Platform pembelajaran aksara tradisional Indonesia dengan AI companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Cubism SDK - perlu download dan host sendiri atau gunakan CDN yang tersedia */}
        <Script
          src="https://cdn.jsdelivr.net/npm/live2dcubismcore@4.0.0/dist/live2dcubismcore.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

