'use client';

import { Museum } from '@/lib/museumData';
import { MapPin, Clock, ExternalLink, Phone } from 'lucide-react';
import Image from 'next/image';

interface MuseumCardProps {
  museum: Museum;
  onClick: () => void;
  isSelected?: boolean;
}

export default function MuseumCard({ museum, onClick, isSelected = false }: MuseumCardProps) {
  const getCategoryBadge = (category: Museum['category']) => {
    const badges = {
      museum: { label: 'Museum', color: 'bg-orange-100 text-orange-700' },
      heritage: { label: 'Situs Warisan', color: 'bg-amber-100 text-amber-700' },
      'cultural-park': { label: 'Taman Budaya', color: 'bg-yellow-100 text-yellow-700' },
    };
    return badges[category];
  };

  const badge = getCategoryBadge(museum.category);

  return (
    <div
      onClick={onClick}
      className={`
        group cursor-pointer rounded-xl overflow-hidden
        bg-white/80 backdrop-blur-sm
        border-2 transition-all duration-300
        hover:shadow-2xl hover:-translate-y-1
        ${isSelected
          ? 'border-orange-500 shadow-xl scale-[1.02]'
          : 'border-gray-200 hover:border-orange-300 shadow-lg'
        }
      `}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        <Image
          src={museum.images[0]}
          alt={museum.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
            {badge.label}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {museum.name}
        </h3>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
          <span className="line-clamp-2">{museum.city}, {museum.province}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
          {museum.description}
        </p>

        {/* Info Grid */}
        <div className="space-y-2 mb-4">
          {/* Hours */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>
              <span className="font-medium">Weekday:</span> {museum.hours.weekday}
            </span>
          </div>

          {/* Phone */}
          {museum.phone && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span>{museum.phone}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500">Harga Tiket</p>
            <p className="text-sm font-bold text-orange-600">{museum.ticketPrice.domestic}</p>
          </div>

          {/* Website Link */}
          {museum.website && (
            <a
              href={museum.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
            >
              Website
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
