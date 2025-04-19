"use client";

import React, { useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useLocationStore } from "../store/useLocationStore";
import { Maps } from "../components/map";

const AddLocation = () => {
  const { addLocation } = useLocationStore();
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState("");
  const [markerColor, setMarkerColor] = useState("#FF0000");

  const handleSubmit = () => {
    if (!selectedLocation || !locationName.trim()) {
      alert("Konum ve ad zorunludur.");
      return;
    }

    addLocation({
      name: locationName,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      color: markerColor,
    });

    // Temizle
    setSelectedLocation(null);
    setLocationName("");
    setMarkerColor("#FF0000");

    alert("Konum başarıyla eklendi!");
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Maps
          onLocationSelect={(lat, lng) => setSelectedLocation({ lat, lng })}
          locations={
            selectedLocation
              ? [
                  {
                    id: "temp",
                    name: locationName || "Yeni Konum",
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng,
                    color: markerColor,
                  },
                ]
              : []
          }
        />

          <Box w={'sm'}>
            <FormControl>
              <FormLabel>Konum Adı</FormLabel>
              <Input
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Konum adı"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Marker Rengi</FormLabel>
              <Input
                type="color"
                value={markerColor}
                onChange={(e) => setMarkerColor(e.target.value)}
              />
            </FormControl>

            <Button w={'sm'} mt={4} colorScheme="blue" onClick={handleSubmit}>
              Konumu Ekle
            </Button>
          </Box>
      </VStack>
    </Box>
  );
};

export default AddLocation;
