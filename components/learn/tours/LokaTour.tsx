'use client';

import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

export function LokaTour() {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('nara-loka-tour-completed');
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
            Selamat Datang di Nara Loka! 🍛
          </h3>
          <p className="text-gray-600">
            Jelajahi kekayaan kuliner nusantara dengan ratusan resep tradisional dari berbagai daerah di Indonesia.
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
            Cari Resep 🔍
          </h3>
          <p className="text-gray-600">
            Cari resep makanan favorit Anda dengan mudah menggunakan fitur pencarian.
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
            Pelajaran Kuliner 📖
          </h3>
          <p className="text-gray-600">
            Pelajari sejarah dan filosofi di balik masakan nusantara yang terkenal.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '.locked-notice',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Modul Terkunci 🔒
          </h3>
          <p className="text-gray-600">
            Modul ini masih terkunci. Selesaikan modul Aksara Nusantara minimal 50% untuk membuka Nara Loka dan mulai menjelajahi resep kuliner!
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
        localStorage.setItem('nara-loka-tour-completed', 'true');
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
          primaryColor: '#F59E0B',
          textColor: '#333',
          width: 400,
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 16,
          padding: 24,
        },
        buttonNext: {
          backgroundColor: '#F59E0B',
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
