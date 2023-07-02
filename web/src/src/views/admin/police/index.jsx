// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  Text,
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
  MdUpdate,
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
import AddCard from "./components/AddCard";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color="black"
        mb="14px"
        mt="30px"
        ml="24px"
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
        Welcome Officer, Have a good day
      </Text>
      <Text
        fontSize={{ base: "14px", md: "24px" }}
        color="black"
        mb="14px"
        ml="24px"
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "75%",
          "3xl": "52%",
        }}
        fontWeight="500"
        lineHeight={{ base: "32px", md: "42px" }}
      >
        Use dashboard to record new suspect criminals and remove any being
        discharged
      </Text>
      <SimpleGrid
        ml="24px"
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
        ml="24px"
        gap="20px"
        mb="20px"
      >
        <AddCard
          title="Add Criminal Data"
          addIcon={MdPersonAdd}
          bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
          path="/admin/police/addCriminal"
        />
        <AddCard
          title="Remove Criminal Data"
          addIcon={MdPersonRemoveAlt1}
          bg="linear-gradient(90deg, #E31A1A 0%, #F56565 100%)"
          path="/admin/police/removeCriminal"
        />

        <AddCard
        title="Update Criminal Data"
        addIcon={MdUpdate}
        bg="linear-gradient(90deg, #FE612C 0%, #ffa12c 100%)"
        path="/admin/police/updateCriminal"
        />
      </SimpleGrid>
      <SimpleGrid
        ml="24px"
        columns={{ base: 2, md: 1, xl: 1 }}
        gap="20px"
        mb="20px"
      >
        <Box width="65vw">
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
            detail={false}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
}
