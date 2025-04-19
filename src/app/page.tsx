import NextLink from "next/link";
import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FiMap } from "react-icons/fi";
import { BsPeopleFill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

export default function Home() {
  return (
    <Box maxW="4xl" mx="auto">
      <VStack textAlign="center" py={12} spacing={4}>
        <Heading as="h1" size="2xl" color="blue.600" mb={2}>
          Lokasyon Takibi Uygulaması
        </Heading>
        <Text fontSize="xl" color="gray.600" mb={8}>
          Favori konumlarınız arasında takip edin, yönetin ve gezinin
        </Text>
      </VStack>

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
          <Button
            as={NextLink}
            href="/add-location"
            colorScheme="blue"
            size="md"
          >
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
            Tüm kayıtlı konumlarınızı görüntüleyin, ayrıntılarını düzenleyin
            veya kaldırın. Koordinatlarını görmek için bir konuma tıklayın.
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
              Mevcut konumunuzdan başlayarak, tüm kayıtlı konumlarınız arasında
              en uygun rotayı oluşturun. Rota, seyahat mesafesini en aza
              indirmek için hesaplanır.
            </Text>
            <Button as={NextLink} href="/route" colorScheme="purple" size="md">
              Rotaları Göster
            </Button>
          </Box>
        </GridItem>
      </SimpleGrid>

      <Box bg="blue.50" rounded="lg" p={6} mb={8}>
        <Heading as="h2" size="md" mb={4}>
          Nasıl Çalışır
        </Heading>
        <List spacing={2} stylePosition="inside">
          <ListItem>
            1. Haritada noktaları seçerek ve onlara adlar, ikonlar ve renkler
            vererek konumlar ekleyin
          </ListItem>
          <ListItem>
            2. Kaydedilen konumlarınızı konumlar listesinde görüntüleyin ve
            yönetin
          </ListItem>
          <ListItem>
            3. Tüm lokasyonlarınız arasında optimum bir rota oluşturun
          </ListItem>
          <ListItem>
            4. Tüm verileriniz yerel olarak tarayıcınızda saklanır - hesaba
            gerek yok!
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
