const { Contract } = require('fabric-contract-api');
const crypto = require('crypto');

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

class LawEnforcementContract extends Contract {
  async registerCriminalRecord(ctx, recordID, firstName, lastName, dateOfBirth, nationality) {
    const record = new CriminalRecord(recordID, firstName, lastName, dateOfBirth, nationality);
    await ctx.stub.putState(recordID, Buffer.from(JSON.stringify(record)));
  }

  async updateCriminalRecord(ctx, recordID, offences, convictions, acquittals) {
    const recordAsBytes = await ctx.stub.getState(recordID);
    if (!recordAsBytes || recordAsBytes.length === 0) {
      throw new Error(`Record with ID ${recordID} does not exist`);
    }

    const record = JSON.parse(recordAsBytes.toString());
    record.offences.push(...offences);
    record.convictions.push(...convictions);
    record.acquittals.push(...acquittals);

    await ctx.stub.putState(recordID, Buffer.from(JSON.stringify(record)));
  }

  async getCriminalRecord(ctx, recordID) {
    const recordAsBytes = await ctx.stub.getState(recordID);
    if (!recordAsBytes || recordAsBytes.length === 0) {
      throw new Error(`Record with ID ${recordID} does not exist`);
    }

    return recordAsBytes.toString();
  }

  async searchCriminalRecords(ctx, query) {
    const queryString = JSON.stringify(query);
    const iterator = await ctx.stub.getQueryResult(queryString);

    const records = [];
    while (true) {
      const record = await iterator.next();
      if (record.value && record.value.value.toString()) {
        const parsedRecord = JSON.parse(record.value.value.toString('utf8'));
        records.push(parsedRecord);
      }

      if (record.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(records);
  }

  async analyzeCriminalRecords(ctx) {
    const iterator = await ctx.stub.getStateByRange('', '');
    const records = [];

    while (true) {
      const record = await iterator.next();
      if (record.value && record.value.value.toString()) {
        const parsedRecord = JSON.parse(record.value.value.toString('utf8'));
        records.push(parsedRecord);
      }

      if (record.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(records);
  }

  async shareRecordInformation(ctx, recordID, recipient) {
    const recordAsBytes = await ctx.stub.getState(recordID);
    if (!recordAsBytes || recordAsBytes.length === 0) {
      throw new Error(`Record with ID ${recordID} does not exist`);
    }

    // Function to encrypt data using recipient's public key
    function encryptData(data, publicKey) {
      const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data, 'utf8'));
      return encryptedData.toString('base64');
    }

    // Function to generate a digital signature using sender's private key
    function generateDigitalSignature(data, privateKey) {
      const sign = crypto.createSign('SHA256');
      sign.update(data);
      const signature = sign.sign(privateKey, 'base64');
      return signature;
    }

    async function shareRecordWithRecipient(ctx, recordID, recipientID) {
      // Retrieve the record from the ledger
      const recordJSON = await ctx.stub.getState(recordID);
      if (!recordJSON || recordJSON.length === 0) {
        throw new Error(`Record with ID ${recordID} does not exist`);
      }

      // Retrieve the recipient's information from the ledger
      const recipientJSON = await ctx.stub.getState(recipientID);
      if (!recipientJSON || recipientJSON.length === 0) {
        throw new Error(`Recipient with ID ${recipientID} does not exist`);
      }

      // Perform the necessary steps to share the record information with the recipient
      const record = JSON.parse(recordJSON.toString());

      // Encrypt the record data using recipient's public key
      const recipientPublicKey = recipientJSON.publicKey;
      const encryptedRecordData = encryptData(JSON.stringify(record), recipientPublicKey);

      // Generate a digital signature using sender's private key
      const senderPrivateKey = ctx.clientIdentity.getPrivateSigningKey();
      const digitalSignature = generateDigitalSignature(encryptedRecordData, senderPrivateKey);

      // Transmit the encrypted data and digital signature securely to the recipient
      // This could involve using secure communication channels or encrypting the data further

      // Once the record information is successfully shared, you can update the shared status
      record.sharedWithRecipient = true;

      // Update the record on the ledger
      await ctx.stub.putState(recordID, Buffer.from(JSON.stringify(record)));

      // Return a success message or any relevant response
      return 'Record information shared with the recipient successfully';
    }

  }
}

module.exports = LawEnforcementContract;
