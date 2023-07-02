import React from "react";

// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      {/* <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      <Text
        fontSize={{ base: "18px", md: "28px" }}
        mb="20px"
        mt="20px"
        // fontWeight="700"
        lineHeight={{ base: "32px", md: "42px" }}
        letterSpacing={{ base: "0.2px", md: "0.4px" }}
      >
        <b>FDRE</b> CMS
      </Text>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
