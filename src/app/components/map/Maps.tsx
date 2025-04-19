"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { Location } from "@/app/types/location";
import { Box, Text } from "@chakra-ui/react";
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

  if (!isLoaded) return <p>Harita yükleniyor...</p>;

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
        locations.map((loc, index) => (
          <Polyline
            key={`line-${index}`}
            path={[userPosition, { lat: loc.latitude, lng: loc.longitude }]}
            options={{
              strokeColor: loc.color,
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        ))}

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
