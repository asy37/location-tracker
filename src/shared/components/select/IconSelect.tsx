"use client";

import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { SymbolOption, symbolOptions } from "@/shared/utils/symbolOptions";

interface IconSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const IconSelect = ({ label, value, onChange }: IconSelectProps) => {
  const [options] = useState<SymbolOption[]>(symbolOptions);
  const selectedOption = options.find((opt) => opt.value === value);

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
            {selectedOption && <Text>{selectedOption.label}</Text>}
            {!selectedOption && "Sembol Seçin"}
          </Flex>
        </MenuButton>

        <MenuList>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              bg={value === option.value ? "blue.50" : "white"}
            >
              <Flex align="center">
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
