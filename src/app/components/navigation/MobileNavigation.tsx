import React from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NavLink from "./NavLink";
import { IoMenuSharp } from "react-icons/io5";

const MobileNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("blue.600", "blue.300");

  return (
    <>
      <Box
        as="nav"
        boxShadow="md"
        bg={bgColor}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="full"
        h={10}
        px="4"
      >
        <IoMenuSharp onClick={onOpen} size={24} />
        <Text fontSize="lg" fontWeight="bold" color={titleColor}>
          YukaTech
        </Text>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>YukaTech</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <NavLink href="/">
                <Text onClick={onClose}>Anasayfa</Text>
              </NavLink>
              <NavLink href="/add-location">
                <Text onClick={onClose}>Lokasyon Ekle</Text>
              </NavLink>
              <NavLink href="/locations-list">
                <Text onClick={onClose}>Lokasyon Listesi</Text>
              </NavLink>
              <NavLink href="/location-edit">
                <Text onClick={onClose}>Lokasyon Düzenle</Text>
              </NavLink>
              <NavLink href="/route">
                <Text onClick={onClose}>Rotalar</Text>
              </NavLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavigation;
