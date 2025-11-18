'use client';

import { MuseumCategory, MuseumRegion, getCategoryLabel, getRegionLabel } from '@/lib/museumData';
import { Search, Filter, X } from 'lucide-react';
import { useState } from 'react';

interface MuseumFilterProps {
  searchQuery: string;
  selectedCategory: MuseumCategory;
  selectedRegion: MuseumRegion;
  selectedProvince: string;
  provinces: string[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: MuseumCategory) => void;
  onRegionChange: (region: MuseumRegion) => void;
  onProvinceChange: (province: string) => void;
  onReset: () => void;
  className?: string;
}

export default function MuseumFilter({
  searchQuery,
  selectedCategory,
  selectedRegion,
  selectedProvince,
  provinces,
  onSearchChange,
  onCategoryChange,
  onRegionChange,
  onProvinceChange,
  onReset,
  className = '',
}: MuseumFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const categories: MuseumCategory[] = ['all', 'museum', 'heritage', 'cultural-park'];
  const regions: MuseumRegion[] = ['all', 'Sumatera', 'Jawa', 'Kalimantan', 'Sulawesi', 'Bali-Nusa Tenggara', 'Papua-Maluku'];

  const hasActiveFilters = selectedCategory !== 'all' || selectedRegion !== 'all' || selectedProvince !== '' || searchQuery !== '';

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari museum berdasarkan nama, kota, atau provinsi..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Toggle Button (Mobile) */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-200 bg-white/80 backdrop-blur-sm hover:border-orange-300 transition-colors md:hidden"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">
            Filter {hasActiveFilters && '•'}
          </span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors text-sm font-medium"
          >
            <X className="w-4 h-4" />
            Reset Filter
          </button>
        )}
      </div>

      {/* Filter Options */}
      <div className={`space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kategori
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 text-gray-700 border-2 border-gray-200 hover:border-orange-300'
                  }
                `}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Region Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Wilayah
          </label>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => onRegionChange(region)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${selectedRegion === region
                    ? 'bg-orange-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 text-gray-700 border-2 border-gray-200 hover:border-orange-300'
                  }
                `}
              >
                {getRegionLabel(region)}
              </button>
            ))}
          </div>
        </div>

        {/* Province Filter */}
        {provinces.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Provinsi
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => onProvinceChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
            >
              <option value="">Semua Provinsi</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
