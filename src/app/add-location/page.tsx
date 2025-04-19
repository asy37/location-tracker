"use client";

import React, { useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useLocationStore } from "../store/useLocationStore";
import { IconSelect } from "../components/icon-select";
import { Maps } from "../components/map";

const AddLocation = () => {
  const toast = useToast();
  const { addLocation } = useLocationStore();

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [markerColor, setMarkerColor] = useState("#FF0000");
  const [locationName, setLocationName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("M3 11 L22 2 L13 21 L11 13 L3 11 Z");

  const handleSubmit = () => {
    if (!selectedLocation || !locationName.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen konum ve ad bilgilerini girin!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    addLocation({
      name: locationName,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      color: markerColor,
      icon: selectedIcon,
    });

    setSelectedLocation(null);
    setLocationName("");
    setMarkerColor("#FF0000");
    setSelectedIcon("");

    toast({
      title: "Konum Eklendi.",
      description: "Seçilen konum başarıyla eklendi.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Box
          w="full"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={4}
        >
          <FormControl>
            <FormLabel>Konum Adı</FormLabel>
            <Input
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Konum adı giriniz"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Marker Rengi</FormLabel>
            <Input
              type="color"
              value={markerColor}
              onChange={(e) => setMarkerColor(e.target.value)}
            />
          </FormControl>

          <IconSelect
            label="Marker İkonu"
            value={selectedIcon}
            onChange={setSelectedIcon}
          />

          <Button w={"sm"} mt={8} colorScheme="blue" onClick={handleSubmit}>
            Konumu Ekle
          </Button>
        </Box>
        <Maps
          height="600px"
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
                    icon: selectedIcon,
                  },
                ]
              : []
          }
        />
      </VStack>
    </Box>
  );
};

export default AddLocation;
