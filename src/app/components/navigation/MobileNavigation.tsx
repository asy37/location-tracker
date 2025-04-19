import React from "react";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react"
import NavLink from "./NavLink";

const MobileNavigation =() =>{
    const { isOpen, onOpen, onClose } = useDisclosure();

    return(
        <>
        <Button onClick={onOpen} m={4}>
          Menü
        </Button>
  
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Menü</DrawerHeader>
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
                <NavLink href="/route">
                  <Text onClick={onClose}>Rotalar</Text>
                </NavLink>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
}

export default MobileNavigation