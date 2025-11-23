'use client';

import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useLanguage } from '@/contexts/LanguageContext';

export function LandingPageTour() {
  const { t } = useLanguage();
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Check if user has seen the tour before
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('nara-tour-completed');
      if (!hasSeenTour) {
        // Start tour after a short delay to let the page load
        const timer = setTimeout(() => {
          setRunTour(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const steps: Step[] = [
    {
      target: 'body',
      content: (
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-900">
            Selamat datang di Nara! 🎉
          </h3>
          <p className="text-gray-600">
            Mari kami tunjukkan cara menggunakan platform pembelajaran bahasa Jawa yang interaktif ini.
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.headline-block',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Belajar Bahasa Jawa dengan AI 🤖
          </h3>
          <p className="text-gray-600">
            Nara menggunakan kecerdasan buatan untuk membantu Anda belajar bahasa Jawa dengan cara yang menyenangkan dan interaktif.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.phone-mockup',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Karakter AI Interaktif 🎭
          </h3>
          <p className="text-gray-600">
            Bertemu dengan Nara, karakter AI yang akan menemani perjalanan belajar Anda. Nara dapat berbicara dan berinteraksi dengan Anda!
          </p>
        </div>
      ),
      placement: 'left',
    },
    {
      target: '.social-proof',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Fitur Lengkap 📚
          </h3>
          <p className="text-gray-600">
            Akses berbagai modul pembelajaran seperti Aksara Jawa, Pola Kata, Kosakata, Peta Budaya, dan masih banyak lagi!
          </p>
        </div>
      ),
      placement: 'left',
    },
    {
      target: '.cta-button',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Mulai Belajar Sekarang! 🚀
          </h3>
          <p className="text-gray-600">
            Klik tombol ini untuk memulai perjalanan belajar bahasa Jawa Anda. Anda akan dipandu melalui proses onboarding yang mudah!
          </p>
        </div>
      ),
      placement: 'bottom',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      // Mark tour as completed
      if (typeof window !== 'undefined') {
        localStorage.setItem('nara-tour-completed', 'true');
      }
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          arrowColor: '#fff',
          backgroundColor: '#fff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          primaryColor: '#C2410C',
          textColor: '#333',
          width: 400,
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 16,
          padding: 24,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonNext: {
          backgroundColor: '#C2410C',
          borderRadius: 8,
          fontSize: 14,
          padding: '10px 20px',
          fontWeight: 600,
        },
        buttonBack: {
          color: '#666',
          marginRight: 10,
        },
        buttonSkip: {
          color: '#999',
        },
      }}
      locale={{
        back: 'Kembali',
        close: 'Tutup',
        last: 'Selesai',
        next: 'Lanjut',
        skip: 'Lewati',
      }}
    />
  );
}
