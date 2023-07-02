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
import { createInvestigation } from "./api";
import { useState } from "react";
import {v4 as uuidv4} from uuidv4;

const [caseNumber, setCaseNumber] = useState('');
const [description, setDescriptions] = useState('');
const [caseNotes, setCaseNotes] = useState('');
const [caseStatus, setCaseStatus] = useState(false);

const handleSubmit = async(event) => {
  event.preventDefault();
  const id = uuidv4();
  try{
    await createInvestigation(id, caseNumber, description);
    

  } catch(error) {
    
  }
}

export default function RegisterInvestigation() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card>
        <form>
          <Text color="brand.400" fontSize="xl" fontWeight="700" mb={5}>
            Add New Investigation
          </Text>
          <SimpleGrid
            columns={{ base: 2, md: 1, xl: 1 }}
            gap="20px"
            mb="20px"
            pl={1.5}
            pr={1.5}
          >
            <FormControl id="case-number" isRequired>
              <FormLabel>Case Number</FormLabel>
              <Input variant="flushed" placeholder="Case Number" bg="white" value={caseNumber} onChange={e => setCaseNumber(e.target.value)} />
            </FormControl>
            <FormControl id="case-details" isRequired>
              <FormLabel>Case Details</FormLabel>
              <Textarea
                variant="flushed"
                placeholder="Case Details"
                bg="white"
                value={caseDetails}
                onChange={e => setDescriptions(e.target.value)}
              />
            </FormControl>
            <FormControl id="case-notes" isRequired>
              <FormLabel>Case Notes</FormLabel>
              <Textarea variant="flushed" placeholder="Case Notes" bg="white" value={caseNotes} onChange={e => setCaseNotes(e.target.value)}/>
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
