// components/EditLocationModal.tsx
"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface EditLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: { id: string; name: string; color: string } | null;
  onSave: (id: string, name: string, color: string) => void;
}

const EditLocationModal = ({
  isOpen,
  onClose,
  location,
  onSave,
}: EditLocationModalProps) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (location) {
      setName(location.name);
      setColor(location.color);
    } else {
      setName("");
      setColor("#FF0000");
    }
  }, [location]);

  const handleSave = () => {
    if (location) {
      onSave(location.id, name, color);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Konumu Düzenle</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Konum Adı</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Marker Rengi</FormLabel>
            <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Kaydet
          </Button>
          <Button onClick={onClose}>İptal</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditLocationModal;