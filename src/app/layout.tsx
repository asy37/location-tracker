import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import Chakra UI components
import { Box, Container, ChakraProvider } from "@chakra-ui/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Location Tracker",
  description: "Track and manage your locations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ChakraProvider>
          <Box minH="100vh" bg="gray.50">
            <Container maxW="container.xl" px={4} py={4}>
              {children}
            </Container>
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
