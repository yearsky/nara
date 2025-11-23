'use client';

import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

export function MapTour() {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('nara-map-tour-completed');
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
            Selamat Datang di Nara Map! 🗺️
          </h3>
          <p className="text-gray-600">
            Jelajahi museum, cagar budaya, dan situs warisan Indonesia melalui peta interaktif yang menarik.
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
            Cari Lokasi 🔍
          </h3>
          <p className="text-gray-600">
            Cari museum atau situs heritage berdasarkan nama atau lokasi dengan fitur pencarian.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.view-toggle',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Tampilan Peta / List 🗺️📋
          </h3>
          <p className="text-gray-600">
            Beralih antara tampilan peta interaktif atau daftar museum sesuai preferensi Anda.
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
            Pelajaran Heritage 🏛️
          </h3>
          <p className="text-gray-600">
            Pelajari sejarah museum dan situs cagar budaya penting di Indonesia.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '.museum-explorer',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Jelajahi Museum 🎨
          </h3>
          <p className="text-gray-600">
            Klik pada marker di peta atau item di list untuk melihat detail museum, jam buka, dan informasi lengkap lainnya!
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
        localStorage.setItem('nara-map-tour-completed', 'true');
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
          primaryColor: '#10B981',
          textColor: '#333',
          width: 400,
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 16,
          padding: 24,
        },
        buttonNext: {
          backgroundColor: '#10B981',
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
