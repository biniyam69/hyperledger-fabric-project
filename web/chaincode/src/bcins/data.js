package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-protos-go/peer"
)

// CriminalRecord represents the criminal record of an individual
type CriminalRecord struct {
	RecordID    string   `json:"record_id"`
	FirstName   string   `json:"first_name"`
	LastName    string   `json:"last_name"`
	DateOfBirth string   `json:"date_of_birth"`
	Nationality string   `json:"nationality"`
	Offences    []string `json:"offences"`
	Convictions []string `json:"convictions"`
	Acquittals  []string `json:"acquittals"`
}

// CriminalRecordContract implements the smart contract for managing criminal records
type CriminalRecordContract struct {
}

// Init initializes the smart contract
func (cc *CriminalRecordContract) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

// Invoke handles smart contract invocations
func (cc *CriminalRecordContract) Invoke(stub shim.ChaincodeStubInterface) peer.Response {
	function, args := stub.GetFunctionAndParameters()

	switch function {
	case "CreateRecord":
		return cc.CreateRecord(stub, args)
	case "GetRecord":
		return cc.GetRecord(stub, args)
	case "UpdateRecord":
		return cc.UpdateRecord(stub, args)
	default:
		return shim.Error("Invalid function name")
	}
}

// CreateRecord creates a new criminal record
func (cc *CriminalRecordContract) CreateRecord(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	recordID := args[0]
	firstName := args[1]
	lastName := args[2]
	dateOfBirth := args[3]
	nationality := args[4]

	record := CriminalRecord{
		RecordID:    recordID,
		FirstName:   firstName,
		LastName:    lastName,
		DateOfBirth: dateOfBirth,
		Nationality: nationality,
		Offences:    []string{},
		Convictions: []string{},
		Acquittals:  []string{},
	}

	recordJSON, err := json.Marshal(record)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = stub.PutState(recordID, recordJSON)
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(nil)
}

// GetRecord retrieves a criminal record by ID
func (cc *CriminalRecordContract) GetRecord(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	recordID := args[0]

	recordJSON, err := stub.GetState(recordID)
	if err != nil {
		return shim.Error(err.Error())
	}
	if recordJSON == nil {
		return shim.Error(fmt.Sprintf("Record with ID %s does not exist", recordID))
	}

	return shim.Success(recordJSON)
}

// UpdateRecord updates a criminal record with new offences, convictions, and acquittals
func (cc *CriminalRecordContract) UpdateRecord(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}

	recordID := args[0]
	offences := args[1]
	convictions := args[2]
	acquittals := args[3]

	recordJSON, err := stub.GetState(recordID)
	if err != nil {
		return shim.Error(err.Error())
	}
	if recordJSON == nil {
		return shim.Error(fmt.Sprintf("Record with ID %s does not exist", recordID))
	}

	record := CriminalRecord{}
	err = json.Unmarshal(recordJSON, &record)
	if err != nil {
		return shim.Error(err.Error())
	}

	record.Offences = append(record.Offences, offences)
	record.Convictions = append(record.Convictions, convictions)
	record.Acquittals = append(record.Acquittals, acquittals)

	recordJSON, err = json.Marshal(record)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = stub.PutState(recordID, recordJSON)
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(nil)
}

// GetRecordsByLastName retrieves all criminal records with a specific last name
func (cc *CriminalRecordContract) GetRecordsByLastName(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	lastName := args[0]

	queryString := fmt.Sprintf(`{"selector":{"last_name":"%s"}}`, lastName)
	queryResults, err := stub.GetQueryResult(queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer queryResults.Close()

	var records []CriminalRecord
	for queryResults.HasNext() {
		queryResult, err := queryResults.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		record := CriminalRecord{}
		err = json.Unmarshal(queryResult.Value, &record)
		if err != nil {
			return shim.Error(err.Error())
		}

		records = append(records, record)
	}

	recordsJSON, err := json.Marshal(records)
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(recordsJSON)
}

func main() {
	err := shim.Start(new(CriminalRecordContract))
	if err != nil {
		fmt.Printf("Error starting CriminalRecordContract chaincode: %s", err)
	}
}
