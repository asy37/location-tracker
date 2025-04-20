import React from "react";
import { Heading, Text, VStack } from "@chakra-ui/react";

const HomeHeader = () => {
  return (
    <VStack textAlign="center" py={12} spacing={4}>
      <Heading as="h1" size="2xl" color="blue.600" mb={2}>
        Lokasyon Takibi Uygulaması
      </Heading>
      <Text fontSize="xl" color="gray.600" mb={8}>
        Favori konumlarınız arasında takip edin, yönetin ve gezinin
      </Text>
    </VStack>
  );
};

export default HomeHeader;
