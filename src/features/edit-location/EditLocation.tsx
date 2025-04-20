"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  VStack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useLocationStore } from "@/shared/store/useLocationStore";
import { Maps } from "@/shared/components/map";
import { Location } from "@/shared/types/location";
import { IconSelect } from "@/shared/components/select";

interface Props {
  initialData: Location[];
  initialId: string;
}

export const EditLocationContainer = ({ initialData, initialId }: Props) => {
  const { updateLocation } = useLocationStore();
  const toast = useToast();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  useEffect(() => {
    if (initialId) {
      const loc = initialData.find((l) => l.id === initialId);
      if (loc) {
        setSelectedLocation({ ...loc });
      }
    }
  }, [initialId, initialData]);

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
    if (selectedLocation && initialId) {
      updateLocation(initialId, {
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
                <FormLabel>Marker Ikonu</FormLabel>
                <IconSelect
                  value={selectedLocation.icon}
                  onChange={(value) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      icon: value,
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
