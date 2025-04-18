import * as React from 'react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Box, Container } from "@chakra-ui/react";
import { Navigation } from "@/app/components/navigation";
import { Providers } from './providers';

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
        <Providers>
          <Box minH="100vh" bg="gray.50">
            <Navigation />
            <Container maxW="container.xl" px={4} py={4}>
              {children}
            </Container>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
