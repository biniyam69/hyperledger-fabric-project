'use strict';

import { Gateway, Wallets } from 'fabric-network';
import fs from 'fs';
import path from 'path';

async function main() {
  try {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
      console.log('An identity for the user "appUser" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('invoke_lawenforcement');

    // Submit the specified transaction.
    // registerCriminalRecord transaction
    await contract.submitTransaction('registerCriminalRecord', 'RECORD1', 'John', 'Doe', '01-01-1980', 'USA');
    console.log('Transaction has been submitted');

    // updateCriminalRecord transaction
    await contract.submitTransaction('updateCriminalRecord', 'RECORD1', ['Offence1'], ['Conviction1'], ['Acquittal1']);
    console.log('Transaction has been submitted');

    // getCriminalRecord transaction
    const result = await contract.evaluateTransaction('getCriminalRecord', 'RECORD1');
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    // searchCriminalRecords transaction
    const searchResult = await contract.evaluateTransaction('searchCriminalRecords', { firstName: 'John' });
    console.log(`Transaction has been evaluated, result is: ${searchResult.toString()}`);

    // analyzeCriminalRecords transaction
    const analyzeResult = await contract.evaluateTransaction('analyzeCriminalRecords');
    console.log(`Transaction has been evaluated, result is: ${analyzeResult.toString()}`);

    // shareRecordInformation transaction
    await contract.submitTransaction('shareRecordInformation', 'RECORD1', 'RECIPIENT1');
    console.log('Transaction has been submitted');

    // Disconnect from the gateway.
    await gateway.disconnect();

  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

main();
