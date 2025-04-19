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
  useToast,
} from "@chakra-ui/react";
import { useLocationStore } from "../store/useLocationStore";
import { FiTrash2 } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const Locations = () => {
  const { locations, deleteLocation } = useLocationStore();
  const toast = useToast();

  const handleRemoveLocation = (id: string) => {
    deleteLocation(id);
    toast({
      title: "Konum Silindi.",
      description: "Seçilen konum başarıyla silindi.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <TableContainer maxW="800px" mx="auto" mt={8} px={4}>
      <Table variant="simple" size="md" width="full">
        <TableCaption>Kaydedilmiş Konumlar</TableCaption>
        <Thead>
          <Tr>
            <Th>Konum Adı</Th>
            <Th>Marker</Th>
            <Th>Eylemler</Th>
          </Tr>
        </Thead>
        <Tbody>
          {locations.map((location) => (
            <Tr key={location.id}>
              <Td>{location.name}</Td>
              <Td>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={location.color}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={location.icon} />
                </svg>
              </Td>
              <Td>
                <Button
                  mr={2}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleRemoveLocation(location.id)}
                >
                  <FiTrash2 /> Sil
                </Button>
                <Button
                  size="sm"
                  colorScheme="gray"
                  onClick={() => handleRemoveLocation(location.id)}
                >
                  <Link href="/location-edit">
                    <IoIosArrowForward />
                  </Link>{" "}
                </Button>
              </Td>
            </Tr>
          ))}
          {locations.length === 0 && (
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

export default Locations;
