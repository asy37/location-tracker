"use client";
import { Location } from "@/app/types/location";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
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
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
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
    <Box p={6} display="flex" flexDirection="column" gap={10}>
      <VStack spacing={4} align="stretch">
        <Box
          w="full"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={4}
        >
          <FormControl display="inline-block">
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
            <>
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

              <Button w={"sm"} mt={8} colorScheme="blue" onClick={handleSubmit}>
                Kaydet
              </Button>
            </>
          )}
        </Box>
      </VStack>
      {selectedLocation && (
        <Maps
          height="600px"
          locations={[selectedLocation]}
          onLocationSelect={handleMapUpdate}
        />
      )}
    </Box>
  );
};

export default LocationEdit;
