'use client';

import { Museum } from '@/lib/museumData';
import MuseumCard from './MuseumCard';
import { Loader2 } from 'lucide-react';

interface MuseumListProps {
  museums: Museum[];
  selectedMuseum: Museum | null;
  onMuseumSelect: (museum: Museum) => void;
  isLoading?: boolean;
  className?: string;
}

export default function MuseumList({
  museums,
  selectedMuseum,
  onMuseumSelect,
  isLoading = false,
  className = '',
}: MuseumListProps) {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-3" />
          <p className="text-gray-600">Memuat museum...</p>
        </div>
      </div>
    );
  }

  if (museums.length === 0) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🏛️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Tidak ada museum ditemukan
          </h3>
          <p className="text-gray-600">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Menampilkan <span className="font-semibold text-gray-900">{museums.length}</span> museum
        </p>
      </div>

      {/* Museum grid */}
      <div className="grid grid-cols-1 gap-4">
        {museums.map((museum) => (
          <MuseumCard
            key={museum.id}
            museum={museum}
            onClick={() => onMuseumSelect(museum)}
            isSelected={selectedMuseum?.id === museum.id}
          />
        ))}
      </div>
    </div>
  );
}
