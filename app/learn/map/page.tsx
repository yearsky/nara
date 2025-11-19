'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
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
import BottomNav from '@/components/navigation/BottomNav';
import { MapPin, Map, List, ArrowLeft, Loader2, Search } from 'lucide-react';
import { motion } from 'framer-motion';

// Dynamic import for MuseumMap to avoid SSR issues with Leaflet
const MuseumMap = dynamic(() => import('@/components/museum/MuseumMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-500 mx-auto mb-3" />
        <p className="text-gray-600">Memuat peta...</p>
      </div>
    </div>
  ),
});

type ViewMode = 'map' | 'list';

const categoryTabs: { id: MuseumCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Semua', icon: '🏛️' },
  { id: 'museum', label: 'Museum', icon: '🏛️' },
  { id: 'heritage', label: 'Cagar Budaya', icon: '🏺' },
  { id: 'cultural-park', label: 'Taman Budaya', icon: '🎭' },
];

const regionTabs: { id: MuseumRegion; label: string }[] = [
  { id: 'all', label: 'Seluruh Indonesia' },
  { id: 'Jawa', label: 'Jawa' },
  { id: 'Sumatera', label: 'Sumatera' },
  { id: 'Kalimantan', label: 'Kalimantan' },
  { id: 'Sulawesi', label: 'Sulawesi' },
  { id: 'Bali-Nusa Tenggara', label: 'Bali & Nusa Tenggara' },
  { id: 'Papua-Maluku', label: 'Papua & Maluku' },
];

export default function NaraMapPage() {
  const router = useRouter();
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
  const [showFilters, setShowFilters] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          {/* Back Button */}
          <button
            onClick={() => router.push('/learn')}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Kembali ke Belajar</span>
          </button>

          {/* Module Title */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Nara Map</h1>
              <p className="text-green-100">
                Jelajahi {museums.length} museum & situs warisan budaya Indonesia
              </p>
            </div>
            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'map'
                    ? 'bg-white text-green-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                aria-label="Tampilan Peta"
              >
                <Map className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-green-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                aria-label="Tampilan Daftar"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari museum atau situs..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-green-200 focus:bg-white/30 focus:outline-none transition-all"
            />
          </div>

          {/* Category Submenu Tabs */}
          <div className="mb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedCategory === tab.id
                      ? 'bg-white text-green-700 font-semibold shadow-md'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Region Submenu Tabs */}
          <div className="mb-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {regionTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm ${
                    selectedRegion === tab.id
                      ? 'bg-white text-green-700 font-semibold shadow-md'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm text-green-100 hover:text-white transition-colors"
          >
            {showFilters ? '🔼 Sembunyikan Filter' : '🔽 Filter Lanjutan'}
          </button>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
            >
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
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-700">
            Menampilkan <span className="font-bold text-green-700">{filteredMuseums.length}</span>{' '}
            dari {museums.length} lokasi
          </p>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
          >
            <div className="h-[500px] md:h-[600px]">
              <MuseumMap
                museums={filteredMuseums}
                selectedMuseum={selectedMuseum}
                onMuseumSelect={handleMuseumSelect}
                className="h-full w-full"
              />
            </div>
          </motion.div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg p-4"
          >
            <MuseumList
              museums={filteredMuseums}
              selectedMuseum={selectedMuseum}
              onMuseumSelect={handleMuseumSelect}
              isLoading={isLoading}
            />
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredMuseums.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada hasil</h3>
            <p className="text-gray-600 mb-4">
              Coba ubah filter atau kata kunci pencarian
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all"
            >
              Reset Filter
            </button>
          </div>
        )}
      </main>

      {/* Museum Detail Modal */}
      <MuseumDetail
        museum={selectedMuseum}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
