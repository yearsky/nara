'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Museum,
  MuseumCategory,
  MuseumRegion,
  loadMuseumData,
  filterByCategory,
  filterByRegion,
  filterByProvince,
  searchMuseums,
  getUniqueProvinces,
} from '@/lib/museumData';
import MuseumList from '@/components/museum/MuseumList';
import MuseumFilter from '@/components/museum/MuseumFilter';
import MuseumDetail from '@/components/museum/MuseumDetail';
import { Map, List, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Dynamic import for MuseumMap to avoid SSR issues with Leaflet
const MuseumMap = dynamic(() => import('@/components/museum/MuseumMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-3" />
        <p className="text-gray-600">Memuat peta...</p>
      </div>
    </div>
  ),
});

type ViewMode = 'map' | 'list';

export default function MuseumPage() {
  const [museums, setMuseums] = useState<Museum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMuseum, setSelectedMuseum] = useState<Museum | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('map');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MuseumCategory>('all');
  const [selectedRegion, setSelectedRegion] = useState<MuseumRegion>('all');
  const [selectedProvince, setSelectedProvince] = useState('');

  // Load museum data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await loadMuseumData();
      setMuseums(data);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Get unique provinces for filter
  const provinces = useMemo(() => getUniqueProvinces(museums), [museums]);

  // Apply filters
  const filteredMuseums = useMemo(() => {
    let result = museums;

    // Filter by category
    result = filterByCategory(result, selectedCategory);

    // Filter by region
    result = filterByRegion(result, selectedRegion);

    // Filter by province
    if (selectedProvince) {
      result = filterByProvince(result, selectedProvince);
    }

    // Search
    if (searchQuery) {
      result = searchMuseums(result, searchQuery);
    }

    return result;
  }, [museums, selectedCategory, selectedRegion, selectedProvince, searchQuery]);

  // Handle museum selection
  const handleMuseumSelect = (museum: Museum) => {
    setSelectedMuseum(museum);
    setIsDetailOpen(true);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRegion('all');
    setSelectedProvince('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Museum Explorer
                </h1>
                <p className="text-sm text-gray-600">
                  Jelajahi {museums.length} museum & situs warisan budaya Indonesia
                </p>
              </div>
            </div>

            {/* View Mode Toggle (Mobile) */}
            <div className="flex gap-2 md:hidden">
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'map'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Map className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-12 gap-6">
          {/* Sidebar - Filters and List */}
          <div
            className={`
              md:col-span-5 lg:col-span-4 space-y-4
              ${viewMode === 'list' ? 'block' : 'hidden md:block'}
            `}
          >
            {/* Filters */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4">
              <MuseumFilter
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                selectedRegion={selectedRegion}
                selectedProvince={selectedProvince}
                provinces={provinces}
                onSearchChange={setSearchQuery}
                onCategoryChange={setSelectedCategory}
                onRegionChange={setSelectedRegion}
                onProvinceChange={setSelectedProvince}
                onReset={handleResetFilters}
              />
            </div>

            {/* Museum List */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 max-h-[calc(100vh-300px)] overflow-y-auto">
              <MuseumList
                museums={filteredMuseums}
                selectedMuseum={selectedMuseum}
                onMuseumSelect={handleMuseumSelect}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Map */}
          <div
            className={`
              md:col-span-7 lg:col-span-8
              ${viewMode === 'map' ? 'block' : 'hidden md:block'}
            `}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 h-[calc(100vh-180px)] md:h-[calc(100vh-140px)]">
              <MuseumMap
                museums={filteredMuseums}
                selectedMuseum={selectedMuseum}
                onMuseumSelect={handleMuseumSelect}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Museum Detail Modal */}
      <MuseumDetail
        museum={selectedMuseum}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
