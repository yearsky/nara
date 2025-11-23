'use client';

import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

export function AksaraTour() {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('nara-aksara-tour-completed');
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
            Selamat Datang di Aksara Nusantara! ✍️
          </h3>
          <p className="text-gray-600">
            Di sini Anda akan belajar berbagai aksara tradisional Indonesia seperti Jawa, Bali, Sunda, dan lainnya.
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
            Progress Belajar Anda 📈
          </h3>
          <p className="text-gray-600">
            Pantau kemajuan belajar Anda: berapa persen sudah diselesaikan, jumlah pelajaran yang selesai, dan total XP yang didapatkan.
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
            Daftar Pelajaran 📝
          </h3>
          <p className="text-gray-600">
            Klik pada setiap pelajaran untuk mulai belajar. Selesaikan pelajaran secara berurutan untuk membuka pelajaran selanjutnya!
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '.quiz-games-fab',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            Quiz & Games 🎮
          </h3>
          <p className="text-gray-600">
            Uji pemahaman Anda dengan quiz atau mainkan games edukatif untuk belajar sambil bermain!
          </p>
        </div>
      ),
      placement: 'left',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nara-aksara-tour-completed', 'true');
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
          primaryColor: '#3B82F6',
          textColor: '#333',
          width: 400,
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 16,
          padding: 24,
        },
        buttonNext: {
          backgroundColor: '#3B82F6',
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
