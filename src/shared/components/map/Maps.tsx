"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { Location } from "@/shared/types/location";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { TiDeleteOutline } from "react-icons/ti";

interface MapProps {
  locations?: Location[];
  onLocationSelect?: (lat: number, lng: number) => void;
  showRoute?: boolean;
  height?: string;
  width?: string;
  zoom?: number;
  defaultCenter?: { lat: number; lng: number };
}

const containerStyle = (height: string, width: string) => ({
  width,
  height,
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
});

const Map = ({
  locations = [],
  onLocationSelect,
  showRoute = false,
  height = "400px",
  width = "100%",
  zoom = 10,
  defaultCenter = { lat: 41.0082, lng: 28.9784 },
}: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [userPosition, setUserPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setUserPosition({ lat: coords.latitude, lng: coords.longitude });
        },
        (err) => {
          console.warn("Konum alınamadı:", err.message);
        }
      );
    }
  }, []);

  const center = useMemo(() => {
    if (userPosition) return userPosition;
    return defaultCenter;
  }, [userPosition, defaultCenter]);

  if (!isLoaded) return <Spinner />;
  console.log(locations);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle(height, width)}
      center={center}
      zoom={zoom}
      onClick={(e) => {
        if (onLocationSelect && e.latLng) {
          onLocationSelect(e.latLng.lat(), e.latLng.lng());
        }
      }}
    >
      {userPosition && (
        <Marker
          position={userPosition}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 2,
          }}
          title="Your Location"
        />
      )}

      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={{ lat: loc.latitude, lng: loc.longitude }}
          title={loc.name}
          onClick={() => setActiveMarker(loc.id)}
          icon={{
            path: loc.icon as unknown as google.maps.SymbolPath,
            fillColor: loc.color,
            fillOpacity: 1,
            scale: 1,
            strokeColor: "white",
            strokeWeight: 1,
            anchor: new google.maps.Point(12, 12),
          }}
        />
      ))}

      {showRoute &&
        userPosition &&
        locations.length > 0 &&
        (() => {
          const calculateDistance = (
            a: { lat: number; lng: number },
            b: { lat: number; lng: number }
          ) => {
            const toRad = (value: number) => (value * Math.PI) / 180;
            const R = 6371;
            const dLat = toRad(b.lat - a.lat);
            const dLng = toRad(b.lng - a.lng);
            const lat1 = toRad(a.lat);
            const lat2 = toRad(b.lat);
            const aVal =
              Math.sin(dLat / 2) ** 2 +
              Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
            const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
            return R * c;
          };

          const sortedLocations = [...locations].sort(
            (a, b) =>
              calculateDistance(userPosition, {
                lat: a.latitude,
                lng: a.longitude,
              }) -
              calculateDistance(userPosition, {
                lat: b.latitude,
                lng: b.longitude,
              })
          );

          const path = [
            userPosition,
            ...sortedLocations.map((loc) => ({
              lat: loc.latitude,
              lng: loc.longitude,
              lineColor: loc.color,
            })),
          ];

          return (
            <Polyline
              path={path}
              options={{
                strokeColor: "#000000",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          );
        })()}

      {locations.map(
        (loc) =>
          showRoute &&
          activeMarker === loc.id && (
            <InfoWindow
              key={`info-${loc.id}`}
              position={{ lat: loc.latitude, lng: loc.longitude }}
              options={{ headerDisabled: true }}
            >
              <Box>
                <Box
                  display="flex"
                  w="full"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontSize="md" fontWeight="bold">
                    Rota bilgileri :
                  </Text>
                  <Box cursor="pointer" onClick={() => setActiveMarker(null)}>
                    <TiDeleteOutline size={18} />
                  </Box>
                </Box>
                <Box textColor="gray.500" fontWeight="semibold">
                  Lokasyon Adı: {loc.name}
                </Box>
                <Box textColor="gray.500" fontWeight="semibold">
                  Enlem: {loc.latitude}
                </Box>
                <Box textColor="gray.500" fontWeight="semibold">
                  Boylam: {loc.longitude}
                </Box>
              </Box>
            </InfoWindow>
          )
      )}
    </GoogleMap>
  );
};

export default React.memo(Map);
