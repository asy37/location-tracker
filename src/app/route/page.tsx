'use client';

import { useEffect, useState } from 'react';
import { useLocationStore } from '../store/useLocationStore';
import { Location } from '../types/location';
import { Maps } from '../components/map';


const Route = () => {
  const { locations } = useLocationStore();
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.warn('Konum alınamadı:', err.message);
        }
      );
    }
  }, []);

  if (!userPosition) return <p>Konum alınıyor...</p>;

  // Konumları kullanıcıya göre sırala
  const sortedLocations: Location[] = [...locations].sort((a, b) => {
    const distA = Math.hypot(userPosition.lat - a.latitude, userPosition.lng - a.longitude);
    const distB = Math.hypot(userPosition.lat - b.latitude, userPosition.lng - b.longitude);
    return distA - distB;
  });

  return (
    <div style={{ width: '100%' }}>
      <Maps locations={sortedLocations} showRoute />
    </div>
  );
};

export default Route;