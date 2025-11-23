'use client';

import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

export function SymphonyTour() {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('nara-symphony-tour-completed');
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
            Selamat Datang di Nara Symphony! 🎵
          </h3>
          <p className="text-gray-600">
            Dengarkan dan pelajari musik tradisional nusantara dari berbagai daerah di Indonesia.
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.progress-stats',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Progress Belajar 📊
          </h3>
          <p className="text-gray-600">
            Pantau kemajuan belajar musik tradisional Anda: progress, pelajaran selesai, dan XP yang dikumpulkan.
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
            Pelajaran Musik 📚
          </h3>
          <p className="text-gray-600">
            Pelajari sejarah dan cara memainkan alat musik tradisional seperti gamelan, angklung, dan lainnya.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '.popular-tracks',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Lagu Populer 🔥
          </h3>
          <p className="text-gray-600">
            Dengarkan lagu-lagu tradisional yang sedang populer. Klik tombol play untuk mendengarkan!
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '.music-categories',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Jelajahi Alat Musik 🎼
          </h3>
          <p className="text-gray-600">
            Jelajahi berbagai jenis alat musik tradisional dari gamelan Jawa, angklung Sunda, sasando NTT, dan banyak lagi!
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
        localStorage.setItem('nara-symphony-tour-completed', 'true');
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
          primaryColor: '#EC4899',
          textColor: '#333',
          width: 400,
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 16,
          padding: 24,
        },
        buttonNext: {
          backgroundColor: '#EC4899',
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
