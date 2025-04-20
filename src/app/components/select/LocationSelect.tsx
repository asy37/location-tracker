import React from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useLocationStore } from "@/app/store/useLocationStore";
import { Dispatch, SetStateAction } from "react";
import { Location } from "@/app/types/location";

interface LocationSelectProps {
  selectedLocation: Location | null;
  setSelectedLocation: Dispatch<SetStateAction<Location | null>>;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const LocationSelect = ({
  selectedLocation,
  setSelectedLocation,
  setSelectedId,
}: LocationSelectProps) => {
    const { locations } = useLocationStore();

    return (
        <Menu>
        <MenuButton as={Button} variant="outline" width="100%">
          {selectedLocation?.name || "Konum Seç"}
        </MenuButton>
        <MenuList>
          {locations.map((loc) => (
            <MenuItem
              key={loc.id}
              onClick={() => {
                setSelectedId(loc.id);
                setSelectedLocation({ ...loc });
              }}
            >
              {loc.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    )
}

export default LocationSelect