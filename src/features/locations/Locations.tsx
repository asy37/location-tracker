"use client";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  PopoverHeader,
} from "@chakra-ui/react";
import { useLocationStore } from "@/shared/store/useLocationStore";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { Location } from "@/shared/types/location";
import { DeleteLocationButton } from "../delete-location/DeleteLocation";
import { useEffect } from "react";

interface Props {
  initialData: Location[];
}

export const LocationsContainer = ({ initialData }: Props) => {
  const { locations, setLocations } = useLocationStore();

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setLocations(initialData);
    }
  }, [initialData, setLocations]);

  const locationList = locations;

  return (
    <TableContainer maxW="800px" mx="auto" mt={8} px={4}>
      <Table variant="simple" size="md" width="full">
        <TableCaption>Kaydedilmiş Konumlar</TableCaption>
        <Thead>
          <Tr>
            <Th>Konum Adı</Th>
            <Th textAlign="center">Marker</Th>
            <Th textAlign="end">Eylemler</Th>
          </Tr>
        </Thead>
        <Tbody>
          {locationList.map((location) => (
            <Tr key={location.id}>
              <Td>{location.name}</Td>
              <Td display="flex" alignContent="center" justifyContent="center">
                <Popover placement="right">
                  <PopoverTrigger>
                    <Button cursor="pointer">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={location.color}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={location.icon} />
                      </svg>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent w="fit-content">
                    <Box>
                      <PopoverHeader>
                        Enlem: {location.latitude.toPrecision(6)}
                      </PopoverHeader>
                      <PopoverHeader>
                        Boylam: {location.longitude.toPrecision(6)}
                      </PopoverHeader>
                    </Box>
                  </PopoverContent>
                </Popover>
              </Td>
              <Td textAlign="end">
                <DeleteLocationButton id={location.id} />
                <Link href={`/locations/edit/${location.id}`}>
                  <Button size="sm" colorScheme="gray">
                    <IoIosArrowForward />
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
          {locationList.length === 0 && (
            <Tr>
              <Td colSpan={5} textAlign="center">
                Henüz kaydedilmiş konum yok.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
