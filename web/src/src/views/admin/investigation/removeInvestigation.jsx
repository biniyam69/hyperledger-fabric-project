// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import Card from "components/card/Card";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdNewReleases,
  MdPersonAdd,
  MdBarChart,
  MdFileCopy,
  MdGroupRemove,
  MdGroupAdd,
  MdPersonRemove,
  MdPersonRemoveAlt1,
  MdRemove,
  MdDelete,
} from "react-icons/md";
// import CheckTable
import ColumnsTable from "views/admin/police/components/ColumnsTable";
import ComplexTable from "views/admin/police/components/ComplexTable";
import DailyTraffic from "views/admin/police/components/DailyTraffic";
import PieCard from "views/admin/police/components/PieCard";
import Tasks from "views/admin/police/components/Tasks";
import TotalSpent from "views/admin/police/components/TotalSpent";
import WeeklyRevenue from "views/admin/police/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/police/variables/columnsData";
import tableDataCheck from "views/admin/police/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/police/variables/tableDataComplex.json";
import CheckTable from "../dataTables/components/CheckTable";
export default function RemoveInvestigation() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdGroupAdd} color={brandColor} />
              }
            />
          }
          name="Suspects"
          value="13"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdGroupRemove} color={brandColor} />
              }
            />
          }
          name="Released"
          value="42"
        />
        <MiniStatistics growth="+13%" name="New Criminals" value="54" />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
            />
          }
          name="Recently Convicted"
          value="21"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Total Criminals"
          value="135"
        />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
        gap="20px"
        mb="20px"
      >
        {/* <AddCard
          title="Add Criminal Data"
          addIcon={MdPersonAdd}
          bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
          path="/admin/police/addCriminal"
        />
        <AddCard
          title="Remove Criminal Data"
          addIcon={MdPersonRemoveAlt1}
          bg="linear-gradient(90deg, #E31A1A 0%, #F56565 100%)"
          path="/addCriminal"
        /> */}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 2, md: 1, xl: 1 }} gap="20px" mb="20px">
        <Flex width="65vw" flexDir={"column"}>
          <CheckTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          />
          <Button
            width={"100%"}
            placeSelf={"end"}
            leftIcon={<Icon as={MdDelete} w="24px" h="24px" color="white" />}
            bg={"red.500"}
            color={"white"}
          >
            Remove
          </Button>
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
