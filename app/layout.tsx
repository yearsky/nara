import type { Metadata } from "next";
import Script from "next/script";
// Uncomment these imports when you have internet connection for Google Fonts
// import { Inter, Playfair_Display } from 'next/font/google';
import "./globals.css";

// Configure fonts (commented out for build without internet)
// Uncomment these when you have internet connection
// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter',
//   display: 'swap',
// });

// const playfair = Playfair_Display({
//   subsets: ['latin'],
//   variable: '--font-playfair',
//   style: ['normal', 'italic'],
//   weight: ['400', '700'],
//   display: 'swap',
// });

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
        {/* Google Fonts - Loaded via CDN as fallback */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}

