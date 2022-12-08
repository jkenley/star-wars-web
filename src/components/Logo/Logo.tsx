import React from "react";
import { Image } from "@chakra-ui/react";
import logo from "@assets/Star_Wars_Logo.png";

const Logo = (): JSX.Element => (
  <Image
    src={logo.src}
    alt="Star Wars Logo"
    width="200px"
    cursor="pointer"
    transition="all .2s ease-in-out"
    _hover={{
      transform: "scale(1.1)"
    }}
  />
);

export default Logo;
