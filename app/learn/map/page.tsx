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
import SubmoduleHeader from '@/components/learn/SubmoduleHeader';
import GlassFooter from '@/components/learn/GlassFooter';
import QuizGamesFAB from '@/components/learn/QuizGamesFAB';
import { MapPin, Map, List, Loader2, Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-emerald-50/30 pb-32 pt-6">
      {/* Header */}
      <SubmoduleHeader
        title="Nara Map"
        subtitle="Jelajahi museum & heritage"
        icon={MapPin}
        gradientFrom="#10B981"
        gradientTo="#059669"
      >
        {/* Search Bar and View Toggle */}
        <div className="flex items-center gap-2 mt-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari museum atau situs..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 text-stone-900 placeholder:text-stone-400 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-400/30 transition-all"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-1 bg-white/70 backdrop-blur-sm rounded-2xl p-1 border border-white/50">
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'map'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-stone-600 hover:bg-white/50'
              }`}
              aria-label="Tampilan Peta"
            >
              <Map className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'list'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-stone-600 hover:bg-white/50'
              }`}
              aria-label="Tampilan Daftar"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </SubmoduleHeader>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Results Count & Filter Button */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-700">
            Menampilkan <span className="font-bold text-green-700">{filteredMuseums.length}</span>{' '}
            dari {museums.length} lokasi
          </p>

          {/* Filter Button - Mobile Only */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-semibold">Filter</span>
          </button>
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

      {/* Mobile Filter Sheet - Floating Bottom Card */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />

            {/* Filter Card */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[80vh] overflow-hidden md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Filter</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="p-4 overflow-y-auto max-h-[calc(80vh-140px)]">
                {/* Category Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Kategori</h4>
                  <div className="flex flex-wrap gap-2">
                    {categoryTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedCategory(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                          selectedCategory === tab.id
                            ? 'bg-green-600 text-white font-semibold shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span>{tab.icon}</span>
                        <span className="text-sm">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Wilayah</h4>
                  <div className="flex flex-wrap gap-2">
                    {regionTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedRegion(tab.id)}
                        className={`px-4 py-2 rounded-full transition-all text-sm ${
                          selectedRegion === tab.id
                            ? 'bg-green-600 text-white font-semibold shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-gray-200 flex gap-3">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
                >
                  Terapkan
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quiz & Games FAB */}
      <QuizGamesFAB modulePath="/learn/map" />

      {/* Glass Footer */}
      <GlassFooter />
    </div>
  );
}
