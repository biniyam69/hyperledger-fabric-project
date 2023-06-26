const { Contract } = require('fabric-contract-api');

// CriminalRecord represents the criminal record of an individual
class CriminalRecord {
  constructor(recordID, firstName, lastName, dateOfBirth, nationality) {
    this.recordID = recordID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.nationality = nationality;
    this.offences = [];
    this.convictions = [];
    this.acquittals = [];
  }
}

// CriminalRecordContract implements the smart contract for managing criminal records
class CriminalRecordContract extends Contract {
  async CreateRecord(ctx, recordID, firstName, lastName, dateOfBirth, nationality) {
    const record = new CriminalRecord(recordID, firstName, lastName, dateOfBirth, nationality);
    await ctx.stub.putState(recordID, Buffer.from(JSON.stringify(record)));
  }

  async GetRecord(ctx, recordID) {
    const recordJSON = await ctx.stub.getState(recordID);
    if (!recordJSON || recordJSON.length === 0) {
      throw new Error(`Record with ID ${recordID} does not exist`);
    }
    return recordJSON.toString();
  }

  async UpdateRecord(ctx, recordID, offences, convictions, acquittals) {
    const recordJSON = await ctx.stub.getState(recordID);
    if (!recordJSON || recordJSON.length === 0) {
      throw new Error(`Record with ID ${recordID} does not exist`);
    }

    const record = JSON.parse(recordJSON.toString());
    record.offences.push(offences);
    record.convictions.push(convictions);
    record.acquittals.push(acquittals);

    await ctx.stub.putState(recordID, Buffer.from(JSON.stringify(record)));
  }

  async GetRecordsByLastName(ctx, lastName) {
    const queryString = {
      selector: {
        lastName: lastName,
      },
    };
    const queryResults = await ctx.stub.getQueryResult(JSON.stringify(queryString));

    const records = [];
    while (true) {
      const record = await queryResults.next();
      if (record.done) {
        break;
      }

      records.push(JSON.parse(record.value.toString('utf8')));
    }

    return JSON.stringify(records);
  }
}

module.exports = CriminalRecordContract;
