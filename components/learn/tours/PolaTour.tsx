'use client';

import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

export function PolaTour() {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('nara-pola-tour-completed');
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
            Selamat Datang di Nara Pola! 🎨
          </h3>
          <p className="text-gray-600">
            Jelajahi keindahan batik, tenun, dan motif tradisional nusantara dengan galeri interaktif kami.
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
            Cari Motif 🔍
          </h3>
          <p className="text-gray-600">
            Gunakan fitur pencarian untuk menemukan motif batik atau tenun favorit Anda dengan cepat.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.lessons-list',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Pelajaran Motif 📚
          </h3>
          <p className="text-gray-600">
            Ikuti pelajaran untuk memahami filosofi dan makna di balik setiap motif tradisional.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '.pattern-gallery',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Galeri Motif 🖼️
          </h3>
          <p className="text-gray-600">
            Jelajahi galeri motif dari berbagai daerah. Klik pada setiap motif untuk melihat detail, warna, dan informasi lengkapnya!
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
        localStorage.setItem('nara-pola-tour-completed', 'true');
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
          primaryColor: '#14B8A6',
          textColor: '#333',
          width: 400,
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 16,
          padding: 24,
        },
        buttonNext: {
          backgroundColor: '#14B8A6',
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
