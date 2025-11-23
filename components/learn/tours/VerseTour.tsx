'use client';

import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

export function VerseTour() {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('nara-verse-tour-completed');
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
            Selamat Datang di Nara Verse! 📖
          </h3>
          <p className="text-gray-600">
            Jelajahi 1000+ cerita rakyat, legenda, dongeng, dan sastra klasik nusantara yang menarik.
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.search-bar',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Cari Cerita 🔍
          </h3>
          <p className="text-gray-600">
            Cari cerita favorit Anda berdasarkan judul dengan fitur pencarian yang mudah digunakan.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.filter-button',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Filter Cerita 🎯
          </h3>
          <p className="text-gray-600">
            Filter cerita berdasarkan kategori (Legenda, Dongeng, Mitologi) dan daerah asal cerita.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.stories-grid',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Galeri Cerita 📚
          </h3>
          <p className="text-gray-600">
            Jelajahi berbagai cerita dari seluruh nusantara. Klik pada setiap kartu cerita untuk membaca selengkapnya!
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
        localStorage.setItem('nara-verse-tour-completed', 'true');
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
          primaryColor: '#8B5CF6',
          textColor: '#333',
          width: 400,
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 16,
          padding: 24,
        },
        buttonNext: {
          backgroundColor: '#8B5CF6',
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
