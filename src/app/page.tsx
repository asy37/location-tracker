import React from "react";
import { Box } from "@chakra-ui/react";
import { HomeContent, HomeHeader, HowToUse } from "./components/home";

export default function Home() {
  return (
    <Box maxW="4xl" p={2} mx="auto">
      <HomeHeader />
      <HomeContent />
      <HowToUse />
    </Box>
  );
}
