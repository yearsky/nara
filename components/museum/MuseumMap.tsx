'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Museum } from '@/lib/museumData';

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MuseumMapProps {
  museums: Museum[];
  selectedMuseum: Museum | null;
  onMuseumSelect: (museum: Museum) => void;
  className?: string;
}

export default function MuseumMap({
  museums,
  selectedMuseum,
  onMuseumSelect,
  className = '',
}: MuseumMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create map centered on Indonesia
    const map = L.map(mapContainerRef.current).setView([-2.5489, 118.0149], 5);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when museums change
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current.clear();

    // Create custom icons based on category
    const createIcon = (category: Museum['category']) => {
      const colors: Record<Museum['category'], string> = {
        museum: '#EA580C',
        heritage: '#C2410C',
        'cultural-park': '#FB923C',
      };

      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${colors[category]};
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <span style="transform: rotate(45deg); color: white; font-size: 16px;">📍</span>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      });
    };

    // Add markers for each museum
    museums.forEach(museum => {
      const marker = L.marker([museum.coordinates[0], museum.coordinates[1]], {
        icon: createIcon(museum.category),
      })
        .addTo(map)
        .bindPopup(`
          <div class="museum-popup" style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">
              ${museum.name}
            </h3>
            <p style="margin: 0 0 4px 0; font-size: 14px; color: #6b7280;">
              ${museum.city}, ${museum.province}
            </p>
            <button
              onclick="window.dispatchEvent(new CustomEvent('museum-select', { detail: '${museum.id}' }))"
              style="
                margin-top: 8px;
                padding: 6px 12px;
                background-color: #EA580C;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
              "
            >
              Lihat Detail
            </button>
          </div>
        `);

      marker.on('click', () => {
        onMuseumSelect(museum);
      });

      markersRef.current.set(museum.id, marker);
    });

    // Fit bounds to show all markers
    if (museums.length > 0) {
      const bounds = L.latLngBounds(museums.map(m => [m.coordinates[0], m.coordinates[1]]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [museums, onMuseumSelect]);

  // Handle museum selection from popup
  useEffect(() => {
    const handleMuseumSelect = (event: Event) => {
      const customEvent = event as CustomEvent;
      const museumId = customEvent.detail;
      const museum = museums.find(m => m.id === museumId);
      if (museum) {
        onMuseumSelect(museum);
      }
    };

    window.addEventListener('museum-select', handleMuseumSelect);
    return () => window.removeEventListener('museum-select', handleMuseumSelect);
  }, [museums, onMuseumSelect]);

  // Highlight selected museum
  useEffect(() => {
    if (!mapRef.current || !selectedMuseum) return;

    const map = mapRef.current;
    const marker = markersRef.current.get(selectedMuseum.id);

    if (marker) {
      // Center map on selected museum
      map.setView([selectedMuseum.coordinates[0], selectedMuseum.coordinates[1]], 13, {
        animate: true,
        duration: 0.5,
      });

      // Open popup
      marker.openPopup();
    }
  }, [selectedMuseum]);

  return (
    <div
      ref={mapContainerRef}
      className={`w-full h-full rounded-xl overflow-hidden shadow-lg ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
}
