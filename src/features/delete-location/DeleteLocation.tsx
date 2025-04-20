import { useLocationStore } from "@/shared/store/useLocationStore";
import { Button, useToast } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

interface Props {
  id: string;
}
export const DeleteLocationButton = ({ id }: Props) => {
  const { deleteLocation } = useLocationStore();
  const toast = useToast();

  const handleRemoveLocation = () => {
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
    <Button
      cursor="pointer"
      mr={2}
      size="sm"
      colorScheme="red"
      onClick={() => handleRemoveLocation()}
    >
      <FiTrash2 />
      <span>Sil</span>
    </Button>
  );
};
