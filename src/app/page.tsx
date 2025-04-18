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
          Location Tracker
        </Heading>
        <Text fontSize="xl" color="gray.600" mb={8}>
          Track, manage, and navigate between your favorite locations
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
              <Center bg="blue.100" p={3} rounded="full" mr={4}>
                <FiMap />
              </Center>
            </Center>
            <Heading as="h2" size="lg">
              Add Locations
            </Heading>
          </Flex>
          <Text color="gray.600" mb={4}>
            Add your favorite locations by selecting them on a map. Give each
            location a name and choose a custom color for its marker.
          </Text>
          <Button
            as={NextLink}
            href="/add-location"
            colorScheme="blue"
            size="md"
          >
            Add Location
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
              Manage Locations
            </Heading>
          </Flex>
          <Text color="gray.600" mb={4}>
            View all your saved locations, edit their details, or remove them.
            Click on a location to see its coordinates.
          </Text>
          <Button as={NextLink} href="/locations" colorScheme="green" size="md">
            View Locations
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
                Generate Routes
              </Heading>
            </Flex>
            <Text color="gray.600" mb={4}>
              Generate the optimal route between all your saved locations,
              starting from your current position. The route is calculated to
              minimize travel distance.
            </Text>
            <Button as={NextLink} href="/route" colorScheme="purple" size="md">
              Show Route
            </Button>
          </Box>
        </GridItem>
      </SimpleGrid>

      <Box bg="blue.50" rounded="lg" p={6} mb={8}>
        <Heading as="h2" size="md" mb={4}>
          How It Works
        </Heading>
        <List spacing={2} stylePosition="inside">
          <ListItem>
            1. Add locations by selecting points on the map and giving them
            names and colors
          </ListItem>
          <ListItem>
            2. View and manage your saved locations in the locations list
          </ListItem>
          <ListItem>
            3. Generate an optimal route between all your locations
          </ListItem>
          <ListItem>
            4. All your data is stored locally in your browser - no account
            needed!
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
