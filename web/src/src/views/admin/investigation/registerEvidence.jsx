import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  SimpleGrid,
  Text,
  Select,
  Textarea,
  Button,
  HStack,
  Grid,
  VStack,
  GridItem,
  Switch,
} from "@chakra-ui/react";
import Card from "components/card/Card";

export default function RegisterEvidence() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card>
        <form>
          <Text color="brand.400" fontSize="xl" fontWeight="700" mb={5}>
            Add Investigation Evidence
          </Text>
          <SimpleGrid
            columns={{ base: 2, md: 1, xl: 1 }}
            gap="20px"
            mb="20px"
            pl={1.5}
            pr={1.5}
          >
            <FormControl id="case-number" isRequired>
              <FormLabel>Item Number</FormLabel>
              <Input variant="flushed" placeholder="Item Number" bg="white" />
            </FormControl>
            <FormControl id="case-details" isRequired>
              <FormLabel>Case Details</FormLabel>
              <Textarea
                variant="flushed"
                placeholder="Case Details"
                bg="white"
              />
            </FormControl>
            <FormControl id="case-notes" isRequired>
              <FormLabel>Case Notes</FormLabel>
              <Textarea variant="flushed" placeholder="Case Notes" bg="white" />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="case-status" mb="0">
                is the Case Still Open?
              </FormLabel>
              <Switch id="case-status" colorScheme="brand" />
            </FormControl>
            <Button
              // placeSelf="start"
              // width="40vw"
              mt={4}
              colorScheme="brand"
              type="submit"
            >
              Submit
            </Button>
          </SimpleGrid>
        </form>
      </Card>
    </Box>
  );
}
