import { MdPersonAdd } from "react-icons/md";
import { Flex, useColorModeValue, Icon, Text } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Custom icons
import React from "react";
import IconBox from "components/icons/IconBox";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function AddCard(props) {
  const { title, addIcon, bg, path } = props;
  const boxBg = useColorModeValue("whiteAlpha", "whiteAlpha.100");
  return (
    <Card py="15px" bg={bg}>
      <NavLink to={path}>
        <Flex
          my="auto"
          h="100%"
          align={{ base: "center", xl: "center" }}
          justify={{ base: "center", xl: "center" }}
        >
          <Text color="white">{title}</Text>
          <Flex ms="auto" w="max-content">
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={addIcon} color="white" />}
            />
          </Flex>
        </Flex>
      </NavLink>
    </Card>
  );
}

export default AddCard;
