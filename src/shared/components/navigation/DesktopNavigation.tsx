import React from "react";
import {
  Box,
  Container,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NavLink from "./NavLink";

const DesktopNavigation = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("blue.600", "blue.300");
  return (
    <Box as="nav" bg={bgColor} boxShadow="md" py={4} mb={6}>
      <Container maxW="container.xl">
        <Stack
          direction={{ base: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          <Text fontSize="xl" fontWeight="bold" color={titleColor}>
            YukaTech
          </Text>
          <HStack spacing={2} flexWrap="wrap">
            <NavLink href="/">Anasayfa</NavLink>
            <NavLink href="/locations/add">Lokasyon Ekle</NavLink>
            <NavLink href="/locations">Lokasyon Listesi</NavLink>
            <NavLink href="/routes">Rotalar</NavLink>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default DesktopNavigation;
