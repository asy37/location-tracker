"use client";
import { Location } from "@/app/types/location";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Heading,
  VStack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useLocationStore } from "../store/useLocationStore";
import { Maps } from "../components/map";

const LocationEdit = () => {
  const toast = useToast();
  const { locations, updateLocation } = useLocationStore();
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const loc = locations.find((l) => l.id === id);
      if (loc) {
        setSelectedId(id);
        setSelectedLocation({ ...loc });
      }
    }
  }, [searchParams, locations]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    const loc = locations.find((l) => l.id === id);
    setSelectedLocation(loc ? { ...loc } : null);
  };

  const handleMapUpdate = (lat: number, lng: number) => {
    if (selectedLocation) {
      setSelectedLocation({
        ...selectedLocation,
        latitude: lat,
        longitude: lng,
      });
    }
  };

  const handleSubmit = () => {
    if (selectedLocation && selectedId) {
      updateLocation(selectedId, {
        name: selectedLocation.name,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        color: selectedLocation.color,
        icon: selectedLocation.icon,
      });
      toast({
        title: "Başarılı",
        description: "Seçilen konum başarıyla güncellendi.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Konum Düzenle</Heading>
      <FormControl mb={4}>
        <FormLabel>Bir konum seçin</FormLabel>
        <Select
          placeholder="Konum Seç"
          onChange={handleSelectChange}
          value={selectedId}
        >
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </Select>
      </FormControl>

      {selectedLocation && (
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Konum Adı</FormLabel>
            <Input
              value={selectedLocation.name}
              onChange={(e) =>
                setSelectedLocation({
                  ...selectedLocation,
                  name: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Renk</FormLabel>
            <Input
              type="color"
              value={selectedLocation.color}
              onChange={(e) =>
                setSelectedLocation({
                  ...selectedLocation,
                  color: e.target.value,
                })
              }
            />
          </FormControl>

          <Maps
            locations={[selectedLocation]}
            onLocationSelect={handleMapUpdate}
          />

          <Button colorScheme="blue" onClick={handleSubmit}>
            Kaydet
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default LocationEdit;
