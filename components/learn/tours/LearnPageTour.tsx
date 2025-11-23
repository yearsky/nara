'use client';

import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

export function LearnPageTour() {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('nara-learn-tour-completed');
      if (!hasSeenTour) {
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
            Selamat Datang di Halaman Belajar! 📚
          </h3>
          <p className="text-gray-600">
            Mari kami tunjukkan cara menggunakan berbagai modul pembelajaran budaya Indonesia yang tersedia.
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.streak-stats',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Statistik Belajar Anda 📊
          </h3>
          <p className="text-gray-600">
            Pantau streak harian, total XP, dan pencapaian Anda. Tetap konsisten belajar setiap hari untuk meningkatkan streak!
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.continue-learning-card',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Lanjutkan Belajar ▶️
          </h3>
          <p className="text-gray-600">
            Melanjutkan pelajaran terakhir Anda dengan mudah. Klik di sini untuk melanjutkan dari poin terakhir yang Anda tinggalkan!
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.search-modules',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Cari & Filter Modul 🔍
          </h3>
          <p className="text-gray-600">
            Gunakan pencarian dan filter untuk menemukan modul pembelajaran yang Anda inginkan berdasarkan kategori, tingkat kesulitan, atau progress.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.learning-modules-grid',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Modul Pembelajaran 🎓
          </h3>
          <p className="text-gray-600">
            Jelajahi berbagai modul seperti Aksara Nusantara, Nara Verse (cerita rakyat), Nara Symphony (musik), Nara Map (museum), dan banyak lagi!
          </p>
        </div>
      ),
      placement: 'top',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nara-learn-tour-completed', 'true');
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
          primaryColor: '#F97316',
          textColor: '#333',
          width: 400,
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 16,
          padding: 24,
        },
        buttonNext: {
          backgroundColor: '#F97316',
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
