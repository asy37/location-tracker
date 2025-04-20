import * as React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Navigation } from "@/shared/components/navigation";
import { Providers } from "./providers";
import { Center, Spinner } from "@chakra-ui/react";

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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Navigation />
          <React.Suspense
            fallback={
              <Center minH="100vh">
                <Spinner size="xl" color="blue.500" />
              </Center>
            }
          >
            {children}
          </React.Suspense>
        </Providers>
      </body>
    </html>
  );
}