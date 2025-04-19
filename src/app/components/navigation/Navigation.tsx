'use client';

import React, { ReactNode } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Box, 
  Container, 
  HStack, 
  Link, 
  Text, 
  useColorModeValue,
  Stack
} from '@chakra-ui/react';

const Navigation = () => {
  const pathname = usePathname();
  const bgColor = useColorModeValue('white', 'gray.800');
  const titleColor = useColorModeValue('blue.600', 'blue.300');

  const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
    const isActive = pathname === href;

    return (
      <Link
        as={NextLink}
        href={href}
        px={4}
        py={2}
        rounded={'md'}
        bg={isActive ? 'blue.50' : 'transparent'}
        color={isActive ? 'blue.700' : 'gray.700'}
        _hover={{
          textDecoration: 'none',
          bg: isActive ? 'blue.50' : 'gray.100',
        }}
        transition={'all 0.2s'}
      >
        {children}
      </Link>
    );
  };

  return (
    <Box as="nav" bg={bgColor} boxShadow="md" py={4} mb={6}>
      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={titleColor}
          >
            Location Tracker
          </Text>
          <HStack spacing={2} flexWrap="wrap">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/add-location">Add Location</NavLink>
            <NavLink href="/locations">Locations</NavLink>
            <NavLink href="/location-edit">Location Edit</NavLink>
            <NavLink href="/route">Route</NavLink>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navigation;
