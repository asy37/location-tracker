"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react"; // @emotion/react'ı kullanıyoruz
import createCache from "@emotion/cache"; // Cache oluşturmak için

// Emotion cache oluşturma
const emotionCache = createCache({ key: "chakra", prepend: true });

// Define the theme
const theme = extendTheme({
  fonts: {
    heading: "var(--font-geist-sans)",
    body: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },
  colors: {
    blue: {
      50: "#e6f0ff",
      100: "#b3d1ff",
      500: "#3182ce",
      600: "#2b6cb0",
      700: "#2c5282",
      800: "#2a4365",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    green: {
      500: "#38a169",
      600: "#2f855a",
      700: "#276749",
    },
    purple: {
      500: "#805ad5",
      600: "#6b46c1",
      700: "#553c9a",
    },
    red: {
      500: "#e53e3e",
      600: "#c53030",
      700: "#9b2c2c",
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </div>
  );
}
