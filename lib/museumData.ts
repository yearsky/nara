export interface Museum {
  id: string;
  name: string;
  category: 'museum' | 'heritage' | 'cultural-park';
  coordinates: [number, number];
  address: string;
  city: string;
  province: string;
  region: string;
  description: string;
  images: string[];
  hours: {
    weekday: string;
    weekend: string;
    closed: string;
  };
  website: string;
  phone: string;
  ticketPrice: {
    domestic: string;
    foreign: string;
  };
}

export interface MuseumData {
  museums: Museum[];
}

export type MuseumCategory = 'museum' | 'heritage' | 'cultural-park' | 'all';
export type MuseumRegion = 'Sumatera' | 'Jawa' | 'Kalimantan' | 'Sulawesi' | 'Bali-Nusa Tenggara' | 'Papua-Maluku' | 'all';

// Load museum data
export async function loadMuseumData(): Promise<Museum[]> {
  try {
    const response = await fetch('/data/museums.json');
    const data: MuseumData = await response.json();
    return data.museums;
  } catch (error) {
    console.error('Failed to load museum data:', error);
    return [];
  }
}

// Get all museums
export function getAllMuseums(museums: Museum[]): Museum[] {
  return museums;
}

// Get museum by ID
export function getMuseumById(museums: Museum[], id: string): Museum | undefined {
  return museums.find(museum => museum.id === id);
}

// Filter museums by category
export function filterByCategory(museums: Museum[], category: MuseumCategory): Museum[] {
  if (category === 'all') return museums;
  return museums.filter(museum => museum.category === category);
}

// Filter museums by region
export function filterByRegion(museums: Museum[], region: MuseumRegion): Museum[] {
  if (region === 'all') return museums;
  return museums.filter(museum => museum.region === region);
}

// Filter museums by province
export function filterByProvince(museums: Museum[], province: string): Museum[] {
  if (!province) return museums;
  return museums.filter(museum => museum.province === province);
}

// Search museums by name or description
export function searchMuseums(museums: Museum[], query: string): Museum[] {
  if (!query) return museums;

  const lowerQuery = query.toLowerCase();
  return museums.filter(museum =>
    museum.name.toLowerCase().includes(lowerQuery) ||
    museum.description.toLowerCase().includes(lowerQuery) ||
    museum.city.toLowerCase().includes(lowerQuery) ||
    museum.province.toLowerCase().includes(lowerQuery)
  );
}

// Get unique provinces from museums
export function getUniqueProvinces(museums: Museum[]): string[] {
  const provinces = museums.map(museum => museum.province);
  return Array.from(new Set(provinces)).sort();
}

// Get unique regions from museums
export function getUniqueRegions(museums: Museum[]): MuseumRegion[] {
  const regions = museums.map(museum => museum.region) as MuseumRegion[];
  return Array.from(new Set(regions)).sort();
}

// Get museums count by category
export function getMuseumCountByCategory(museums: Museum[]): Record<MuseumCategory, number> {
  return {
    all: museums.length,
    museum: museums.filter(m => m.category === 'museum').length,
    heritage: museums.filter(m => m.category === 'heritage').length,
    'cultural-park': museums.filter(m => m.category === 'cultural-park').length,
  };
}

// Get museums count by region
export function getMuseumCountByRegion(museums: Museum[]): Record<string, number> {
  const counts: Record<string, number> = { all: museums.length };

  museums.forEach(museum => {
    counts[museum.region] = (counts[museum.region] || 0) + 1;
  });

  return counts;
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Get nearest museums from a location
export function getNearestMuseums(
  museums: Museum[],
  userLat: number,
  userLon: number,
  limit: number = 5
): Museum[] {
  return museums
    .map(museum => ({
      ...museum,
      distance: calculateDistance(userLat, userLon, museum.coordinates[0], museum.coordinates[1])
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

// Get category label
export function getCategoryLabel(category: MuseumCategory): string {
  const labels: Record<MuseumCategory, string> = {
    all: 'Semua Kategori',
    museum: 'Museum',
    heritage: 'Situs Warisan',
    'cultural-park': 'Taman Budaya',
  };
  return labels[category];
}

// Get region label
export function getRegionLabel(region: MuseumRegion): string {
  const labels: Record<string, string> = {
    all: 'Semua Wilayah',
    Sumatera: 'Sumatera',
    Jawa: 'Jawa',
    Kalimantan: 'Kalimantan',
    Sulawesi: 'Sulawesi',
    'Bali-Nusa Tenggara': 'Bali & Nusa Tenggara',
    'Papua-Maluku': 'Papua & Maluku',
  };
  return labels[region] || region;
}
