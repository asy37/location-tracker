import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import React from "react";
const HowToUse = () => {
  return (
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
          4. Tüm verileriniz yerel olarak tarayıcınızda saklanır - hesaba gerek
          yok!
        </ListItem>
      </List>
    </Box>
  );
};

export default HowToUse;
