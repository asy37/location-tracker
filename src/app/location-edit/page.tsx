"use client";
import { Location } from "@/app/types/location";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  FormControl,
  FormLabel,
  VStack,
  Input,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useLocationStore } from "../store/useLocationStore";
import { Maps } from "../components/map";
import { LocationSelect } from "../components/select";

const SearchWrapper = () => {
  const searchParams = useSearchParams();
  const { locations, updateLocation } = useLocationStore();
  const toast = useToast();
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

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
    <Box p={6} display="flex" flexDirection="column" gap={10} minH="80vh">
      <VStack spacing={4} align="stretch">
        <Box
          w="full"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: 2, md: 4 }}
        >
          <FormControl display="inline-block">
            <FormLabel>Bir konum seçin</FormLabel>
            <LocationSelect
              selectedLocation={selectedLocation}
              setSelectedId={setSelectedId}
              setSelectedLocation={setSelectedLocation}
            />
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

              <Button w="sm" mt={8} colorScheme="blue" onClick={handleSubmit}>
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

const LocationEdit = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchWrapper />
    </Suspense>
  );
};

export default LocationEdit;
