import React from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import { FiMap } from "react-icons/fi";
import { BsPeopleFill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
const HomeContent = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={12}>
      <Box
        bg="white"
        rounded="lg"
        shadow="md"
        p={6}
        _hover={{ shadow: "lg" }}
        transition="box-shadow 0.2s"
      >
        <Flex alignItems="center" mb={4}>
          <Center bg="blue.100" p={3} rounded="full" mr={4}>
            <FiMap />
          </Center>
          <Heading as="h2" size="lg">
            Lokasyon Ekle
          </Heading>
        </Flex>
        <Text color="gray.600" mb={4}>
          Favori konumlarınızı haritada seçerek ekleyin. Her konuma bir isim
          verin ve işaretçisi için özel bir renk seçin.
        </Text>
        <Button as={NextLink} href="/locations/add" colorScheme="blue" size="md">
          Lokasyon Ekle
        </Button>
      </Box>

      <Box
        bg="white"
        rounded="lg"
        shadow="md"
        p={6}
        _hover={{ shadow: "lg" }}
        transition="box-shadow 0.2s"
      >
        <Flex alignItems="center" mb={4}>
          <Center bg="green.100" p={3} rounded="full" mr={4}>
            <BsPeopleFill />
          </Center>
          <Heading as="h2" size="lg">
            Lokasyanları Yönet
          </Heading>
        </Flex>
        <Text color="gray.600" mb={4}>
          Tüm kayıtlı konumlarınızı görüntüleyin, ayrıntılarını düzenleyin veya
          kaldırın. Koordinatlarını görmek için bir konuma tıklayın.
        </Text>
        <Button as={NextLink} href="/locations" colorScheme="green" size="md">
          Lokasyonları Görüntüle
        </Button>
      </Box>

      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Box
          bg="white"
          rounded="lg"
          shadow="md"
          p={6}
          _hover={{ shadow: "lg" }}
          transition="box-shadow 0.2s"
        >
          <Flex alignItems="center" mb={4}>
            <Center bg="purple.100" p={3} rounded="full" mr={4}>
              <IoLocationOutline />
            </Center>
            <Heading as="h2" size="lg">
              Rota Oluştur
            </Heading>
          </Flex>
          <Text color="gray.600" mb={4}>
            Mevcut konumunuzdan başlayarak, tüm kayıtlı konumlarınız arasında en
            uygun rotayı oluşturun. Rota, seyahat mesafesini en aza indirmek
            için hesaplanır.
          </Text>
          <Button as={NextLink} href="/routes" colorScheme="purple" size="md">
            Rotaları Göster
          </Button>
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};
export default HomeContent;
