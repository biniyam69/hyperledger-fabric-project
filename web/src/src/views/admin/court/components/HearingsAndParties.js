import React from "react";

// Chakra importjs
import { Button, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

// Assets
// import banner from "assets/img/nfts/NftBanner1.png";
export default function Banner() {
  // Chakra Color Mode
  return (
    <Flex
      direction="column"
      // bgImage={banner}
      bg="linear-gradient(90deg, #C03DED 0%, #770087 100%)"
      // backgroundColor={{}}
      // bgSize="cover"
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius="30px"
    >
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color="white"
        mb="14px"
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "55%",
          "3xl": "52%",
        }}
        fontWeight="700"
        lineHeight={{ base: "32px", md: "42px" }}
      >
        Hearings and Parties of Cases
      </Text>
      <Text
        fontSize="md"
        color="#E3DAFF"
        maxW={{
          base: "100%",
          md: "64%",
          lg: "40%",
          xl: "56%",
          "2xl": "46%",
          "3xl": "34%",
        }}
        fontWeight="500"
        mb="40px"
        lineHeight="28px"
      >
        Schedule hearings and add parties to cases in here.
      </Text>
      <Flex align="center">
        <NavLink to="/admin/court/ScheduleHearing">
          <Button
            bg="white"
            color="black"
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            fontWeight="500"
            fontSize="14px"
            py="20px"
            px="27"
            me="38px"
          >
            Schedule New Hearing
          </Button>
        </NavLink>
        <NavLink to="/admin/court/addParties">
          <Text color="white" fontSize="sm" fontWeight="500">
            Add Parties to Cases
          </Text>
        </NavLink>
      </Flex>
    </Flex>
  );
}
