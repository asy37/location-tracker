"use client";

import React from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

const Navigation = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (!isMobile) {
    return <DesktopNavigation />;
  }

  return <MobileNavigation />;
};

export default Navigation;
