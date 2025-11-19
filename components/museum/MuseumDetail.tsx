'use client';

import { Museum } from '@/lib/museumData';
import { X, MapPin, Clock, Phone, ExternalLink, Navigation, Calendar, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface MuseumDetailProps {
  museum: Museum | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MuseumDetail({ museum, isOpen, onClose }: MuseumDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // Reset image index when museum changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [museum]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !museum) return null;

  const getCategoryBadge = (category: Museum['category']) => {
    const badges = {
      museum: { label: 'Museum', color: 'bg-orange-100 text-orange-700' },
      heritage: { label: 'Situs Warisan', color: 'bg-amber-100 text-amber-700' },
      'cultural-park': { label: 'Taman Budaya', color: 'bg-yellow-100 text-yellow-700' },
    };
    return badges[category];
  };

  const badge = getCategoryBadge(museum.category);

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${museum.coordinates[0]},${museum.coordinates[1]}`;
    window.open(url, '_blank');
  };

  const handleAskNara = () => {
    // Create context with museum details for Nara
    const naraContext = {
      type: 'museum',
      id: museum.id,
      prompt: `Nara, jelaskan ${museum.name} ini dong`,
      data: {
        name: museum.name,
        category: museum.category,
        location: `${museum.city}, ${museum.province}`,
        description: museum.description,
        region: museum.region
      }
    };

    // Save context to localStorage for chat to pick up
    localStorage.setItem('naraContext', JSON.stringify(naraContext));

    // Navigate to chat page
    router.push('/chat');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[90vh]">
            {/* Image Gallery */}
            <div className="relative h-80 bg-gray-200">
              <Image
                src={museum.images[currentImageIndex]}
                alt={museum.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${badge.color}`}>
                  {badge.label}
                </span>
              </div>

              {/* Image Navigation */}
              {museum.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {museum.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Title and Location */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {museum.name}
                </h2>
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-500" />
                  <div>
                    <p className="font-medium">{museum.address}</p>
                    <p className="text-sm">{museum.city}, {museum.province}</p>
                    <p className="text-sm text-gray-500">{museum.region}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Tentang</h3>
                <p className="text-gray-700 leading-relaxed">{museum.description}</p>
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Hours */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    Jam Operasional
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hari Kerja:</span>
                      <span className="font-medium text-gray-900">{museum.hours.weekday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Akhir Pekan:</span>
                      <span className="font-medium text-gray-900">{museum.hours.weekend}</span>
                    </div>
                    {museum.hours.closed !== '-' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tutup:</span>
                        <span className="font-medium text-red-600">{museum.hours.closed}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ticket Prices */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    Harga Tiket
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domestik:</span>
                      <span className="font-bold text-orange-600">{museum.ticketPrice.domestic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mancanegara:</span>
                      <span className="font-bold text-orange-600">{museum.ticketPrice.foreign}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900">Kontak</h3>
                <div className="space-y-2">
                  {museum.phone && (
                    <a
                      href={`tel:${museum.phone}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-900">{museum.phone}</span>
                    </a>
                  )}
                  {museum.website && (
                    <a
                      href={museum.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-900">Kunjungi Website</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={handleGetDirections}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Navigation className="w-5 h-5" />
                  Petunjuk Arah
                </button>

                <button
                  onClick={handleAskNara}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Tanya Nara
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
