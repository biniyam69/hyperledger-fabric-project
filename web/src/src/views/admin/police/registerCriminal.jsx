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
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Upload from "./components/Upload";
import { registerCriminalRecord } from "./api";
import {v4 as uuidv4} from uuidv4;
import { useState } from "react";
const [recordID, setRecordID] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [nationality, setNationality] = useState('');
const [gender, setGender] = useState('');
const [dateOfBirth, setDateOfBirth] = useState('');
const [martialstatus, setMartialStatus] = useState('');
const [region, setRegion] = useState('');
const [conviction, setConviction] = useState('');
const [offense, setOffense] = useState('');
const [offenseDate, setOffenseDate] = useState('');
const [city, setCity] = useState('');
const [subCity, setSubCity] = useState('');
const [acquittals, setAcquittals] = useState('');


const handleSubmit = async(event) => {
  event.preventDefault();

  try {
    await registerCriminalRecord(recordID, firstName, lastName, gender,nationality, dateOfBirth, region, conviction, offense, offenseDate, city, subCity, acquittals);

    //Clear the form

    setRecordID('');
    setFirstName('');
    setLastName('');
    setGender('')
    setNationality('');
    setDateOfBirth('');
    setRegion('');
    setConviction('');
    setOffense('');
    setOffenseDate('');
    setCity('');
    setSubCity('');
    setAcquittals('');


    alert('Criminal Registered Sucessfully');

  } catch (error) {
    console.error('An error occured', error);
    alert('An error occured, please try again!');
  }
  
};


export default function RegisterCriminal() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card>
        <form>
          <Text color="brand.400" fontSize="xl" fontWeight="700" mb={5}>
            Add Criminal
          </Text>
          <SimpleGrid
            columns={{ base: 2, md: 1, xl: 1 }}
            gap="20px"
            mb="20px"
            pl={1.5}
            pr={1.5}
          >
            <Grid
              templateColumns="repeat(3,1fr)"
              templateRows="repeat(3,1fr)"
              columnGap={10}
            >
              <GridItem colSpan={1} rowSpan={4}>
                <Upload />
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl d="record-id" isRequired>
                  <FormLabel>Record Id</FormLabel>
                  <Input variant="flushed" placeholder="Record Id" bg="white" value={recordID} onChange={e => setRecordID(e.target.value)}/>
                </FormControl>
              </GridItem>
              <FormControl id="first-name" isRequired>
                <FormLabel>First name</FormLabel>
                <Input variant="flushed" placeholder="First name" bg="white" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </FormControl>
              <FormControl id="last-name" isRequired>
                <FormLabel>Last name</FormLabel>
                <Input variant="flushed" placeholder="Last name" bg="white" value={lastName} onChange={e => e.target.value}/>
              </FormControl>
              <FormControl id="date-of-birth" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input variant="flushed" type="date" placeholder="Last name" value={dateOfBirth} onSubmit={e => setDateOfBirth(e.target.value)} />
              </FormControl>

              <FormControl id="nationality" isRequired>
                <FormLabel>Nationality</FormLabel>
                <Input
                  variant="flushed"
                  placeholder="Pick Nationality"
                  bg="white"
                  value={nationality}
                  onChange={e => setNationality(e.target.value)}
                />
              </FormControl>
              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <Select variant="flushed" placeholder="Gender" bg="white" value={gender} onSubmit={e => setGender(e.target.value)}>
                  <option>Male</option>
                  <option>Female</option>
                </Select>
              </FormControl>
              <FormControl id="martial-status" isRequired>
                <FormLabel>Martial Status</FormLabel>
                <Select
                  variant="flushed"
                  placeholder="Martial Status"
                  bg="white"
                  value={martialstatus}
                  onSubmit={e => setMartialStatus(e.target.value)}
                >
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Separated</option>
                  <option>Widowed</option>
                  <option>Other</option>
                </Select>
              </FormControl>
            </Grid>
            {/* 
            <SimpleGrid columns={{ base: 2, md: 1, xl: 2 }} gap={10}>
              <FormControl id="first-name" isRequired>
                <FormLabel>First name</FormLabel>
                <Input variant="flushed" placeholder="First name" bg="white" />
              </FormControl>
              <FormControl id="last-name" isRequired>
                <FormLabel>Last name</FormLabel>
                <Input variant="flushed" placeholder="Last name" bg="white" />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 2, md: 1, xl: 2 }} gap={10}>
              <FormControl id="date-of-birth" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input variant="flushed" type="date" placeholder="Last name" />
              </FormControl>

              <FormControl id="nationality" isRequired>
                <FormLabel>Nationality</FormLabel>
                <Input
                  variant="flushed"
                  placeholder="Pick Nationality"
                  bg="white"
                />
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 2, md: 1, xl: 2 }} gap={10}>
              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <Select variant="flushed" placeholder="Gender" bg="white">
                  <option>Male</option>
                  <option>Female</option>
                </Select>
              </FormControl>
              <FormControl id="martial-status" isRequired>
                <FormLabel>Martial Status</FormLabel>
                <Select
                  variant="flushed"
                  placeholder="Martial Status"
                  bg="white"
                >
                  <option>Single</option>
                  <option>Married</option>
                  <option>Other</option>
                </Select>
              </FormControl>
            </SimpleGrid> */}
            <SimpleGrid columns={{ base: 2, md: 1, xl: 3 }} gap={10}>
              <FormControl id="acquittals" isRequired>
                <FormLabel>Acquittals</FormLabel>
                <Input variant="flushed" placeholder="Acquittals" bg="white" />
              </FormControl>
              <FormControl id="city" isRequired>
                <FormLabel>City</FormLabel>
                <Input variant="flushed" placeholder="City" bg="white" />
              </FormControl>
              <FormControl id="sub-city" isRequired>
                <FormLabel>Sub-City</FormLabel>
                <Input variant="flushed" placeholder="Sub-City" bg="white" />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 2, md: 1, xl: 3 }} gap={10}>
              <FormControl id="offense" isRequired>
                <FormLabel>Offense</FormLabel>
                <Input variant="flushed" placeholder="Crime Type" bg="white" />
              </FormControl>
              <FormControl id="offense-date-time" isRequired>
                <FormLabel>Offense Date and Time</FormLabel>
                <Input variant="flushed" type="date" bg="white" />
              </FormControl>

              <FormControl id="offense-date-time" isRequired>
                <FormLabel></FormLabel>
                <Input variant="flushed" type="time" bg="white" />
              </FormControl>
            </SimpleGrid>
            <FormControl id="conviction" isRequired>
              <FormLabel>Conviction</FormLabel>
              <Select variant="flushed" placeholder="Convicted For" bg="white">
                <option>Felony </option>
                <option>Misdemeanor </option>
                <option>Infraction </option>
                <option>DUI/DWI </option>
                <option>Assault </option>
                <option>Battery </option>
                <option>Drug possession </option>
                <option>Theft </option>
                <option>Fraud </option>
                <option>Robbery </option>
                <option>Burglary </option>
                <option>Homicide </option>
                <option>Manslaughter </option>
                <option>Kidnapping </option>
                <option>Sexual assault </option>
                <option>Domestic violence </option>
                <option>Harassment </option>
                <option>Stalking </option>
                <option>Identity theft </option>
                <option>Cybercrime </option>
                <option>Other</option>
              </Select>
            </FormControl>

            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                //   variant="flushed"
                placeholder="Description"
                bg="white"
              />
            </FormControl>
            <Button
              //   placeSelf="end"
              //   width="40vw"
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
