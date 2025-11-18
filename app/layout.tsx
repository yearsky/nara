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
        {/* Cubism SDK akan dimuat secara manual di client component */}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

