'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  id: {
    // Header
    'nav.museum': 'Museum',
    'nav.learn': 'Learn',
    'nav.loka': 'Loka',
    'nav.symphony': 'Symphony',
    'nav.verse': 'Verse',
    'nav.aksara': 'Aksara',
    'nav.pola': 'Pola',
    'nav.dashboard': 'Dashboard',

    // Homepage
    'home.title': 'Nara.ai',
    'home.subtitle1': 'Your Cultural',
    'home.subtitle2': 'AI Companion',
    'home.description': 'Jelajahi kekayaan budaya Indonesia dengan AI companion yang interaktif dan personal',
    'home.cta': 'Coba Nara.ai',

    // Features
    'feature.ai': 'AI Powered',
    'feature.cultural': 'Kaya Budaya',
    'feature.learning': 'Pembelajaran Interaktif',
    'feature.trusted': 'Dipercaya oleh',
    'feature.users': 'pengguna',

    // Stats
    'stats.activeUsers': 'Pengguna Aktif',
    'stats.conversations': 'Percakapan Harian',
    'stats.satisfaction': 'Tingkat Kepuasan',
    'stats.rated': 'Dinilai sangat baik oleh komunitas kami',
    'stats.learning': 'orang sedang belajar sekarang',

    // Chat
    'chat.greeting': 'Halo! Aku Nara, AI companion-mu 👋',
    'chat.question': 'Mau belajar budaya Indonesia yang mana hari ini?',
    'chat.placeholder': 'Ketik pesan...',

    // Testimonial
    'testimonial.quote': '"Nara membantu aku belajar budaya Indonesia dengan cara yang menyenangkan dan interaktif!"',
    'testimonial.name': 'Andi Pratama',
    'testimonial.location': 'Pelajar, Jakarta',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Lihat progres kamu',
  },
  en: {
    // Header
    'nav.museum': 'Museum',
    'nav.learn': 'Learn',
    'nav.loka': 'Loka',
    'nav.symphony': 'Symphony',
    'nav.verse': 'Verse',
    'nav.aksara': 'Aksara',
    'nav.pola': 'Pola',
    'nav.dashboard': 'Dashboard',

    // Homepage
    'home.title': 'Nara.ai',
    'home.subtitle1': 'Your Cultural',
    'home.subtitle2': 'AI Companion',
    'home.description': 'Explore the richness of Indonesian culture with an interactive and personal AI companion',
    'home.cta': 'Try Nara.ai',

    // Features
    'feature.ai': 'AI Powered',
    'feature.cultural': 'Cultural Rich',
    'feature.learning': 'Interactive Learning',
    'feature.trusted': 'Trusted by',
    'feature.users': 'users',

    // Stats
    'stats.activeUsers': 'Active Users',
    'stats.conversations': 'Daily Conversations',
    'stats.satisfaction': 'Satisfaction Rate',
    'stats.rated': 'Rated excellent by our community',
    'stats.learning': 'people are learning right now',

    // Chat
    'chat.greeting': 'Hello! I\'m Nara, your AI companion 👋',
    'chat.question': 'What Indonesian culture would you like to learn today?',
    'chat.placeholder': 'Type a message...',

    // Testimonial
    'testimonial.quote': '"Nara helps me learn Indonesian culture in a fun and interactive way!"',
    'testimonial.name': 'Andi Pratama',
    'testimonial.location': 'Student, Jakarta',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'View your progress',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('nara-language') as Language;
    if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nara-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['id']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
