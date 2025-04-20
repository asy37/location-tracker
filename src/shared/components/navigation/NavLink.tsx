import React, { ReactNode } from "react";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      as={NextLink}
      href={href}
      px={4}
      py={2}
      rounded={"md"}
      bg={isActive ? "blue.50" : "transparent"}
      color={isActive ? "blue.700" : "gray.700"}
      _hover={{
        textDecoration: "none",
        bg: isActive ? "blue.50" : "gray.100",
      }}
      transition={"all 0.2s"}
    >
      {children}
    </Link>
  );
};

export default NavLink;
