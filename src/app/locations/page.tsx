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
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { EditLocationModal } from "../components/modal";

const Locations = () => {
  const { locations, deleteLocation, updateLocation } = useLocationStore();
  const toast = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLocationToEdit, setSelectedLocationToEdit] =
    useState<{ id: string; name: string; color: string } | null>(null);

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

  const handleEditLocation = (location: {
    id: string;
    name: string;
    color: string;
  }) => {
    setSelectedLocationToEdit(location);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedLocationToEdit(null);
  };

  const handleSaveEditedLocation = (
    id: string,
    name: string,
    color: string
  ) => {
    updateLocation(id, { name, color });
    toast({
      title: "Konum Güncellendi.",
      description: "Seçilen konum başarıyla güncellendi.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    handleCloseEditModal();
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Kaydedilmiş Konumlar</TableCaption>
        <Thead>
          <Tr>
            <Th>Ad</Th>
            <Th>Enlem</Th>
            <Th>Boylam</Th>
            <Th>Renk</Th>
            <Th>Eylemler</Th>
          </Tr>
        </Thead>
        <Tbody>
          {locations.map((location) => (
            <Tr key={location.id}>
              <Td>{location.name}</Td>
              <Td>{location.latitude}</Td>
              <Td>{location.longitude}</Td>
              <Td>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: location.color,
                    borderRadius: "4px",
                  }}
                />
              </Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="yellow"
                  mr={2}
                  onClick={() =>
                    handleEditLocation({
                      id: location.id,
                      name: location.name,
                      color: location.color,
                    })
                  }
                >
                  <FiEdit /> Düzenle
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleRemoveLocation(location.id)}
                >
                  <FiTrash2 /> Sil
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

      <EditLocationModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        location={selectedLocationToEdit}
        onSave={handleSaveEditedLocation}
      />
    </TableContainer>
  );
};

export default Locations;