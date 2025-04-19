"use client";

import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

interface IconOption {
  value: string;
  label: string;
  src: string;
}

interface IconSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const IconSelect = ({ label, value, onChange }: IconSelectProps) => {
  const [iconOptions, setIconOptions] = useState<IconOption[]>([]);
  const selectedOption = iconOptions.find((opt) => opt.value === value);

  useEffect(() => {
    const staticIcons: IconOption[] = [
      { value: "car", label: "Araba", src: "/assets/markerIcon/car.svg" },
      { value: "heart", label: "Kalp", src: "/assets/markerIcon/heart.svg" },
      { value: "location", label: "Konum", src: "/assets/markerIcon/location.svg" },
      { value: "navigation", label: "Navigasyon", src: "/assets/markerIcon/navigation.svg" },
    ];

    setIconOptions(staticIcons);
  }, []);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<FaChevronDown />}
          w="100%"
          justifyContent="space-between"
          variant="outline"
        >
          <Flex align="center">
            {selectedOption && (
              <>
                <Image src={selectedOption.src} alt={selectedOption.label} width="20px" height="20px" mr={2} />
                <Text>{selectedOption.label}</Text>
              </>
            )}
            {!selectedOption && "İkon Seçin"}
          </Flex>
        </MenuButton>

        <MenuList>
          {iconOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              bg={value === option.value ? "blue.50" : "white"}
            >
              <Flex align="center">
                <Image src={option.src} alt={option.label} width="24px" height="24px" mr={3} />
                <Text>{option.label}</Text>
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormControl>
  );
};

export default IconSelect;