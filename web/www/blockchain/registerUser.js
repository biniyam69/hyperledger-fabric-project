'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
let connection_file = config.connection_file;
let appAdmin = config.appAdmin;
let orgMSPID = config.orgMSPID;
let userName = config.userName;
let gatewayDiscovery = config.gatewayDiscovery;

const ccpPath = path.join(process.cwd(), './ibpConnection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function main() {
    try {

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const userExists = await wallet.exists(userName);
        if (userExists) {
            console.log(`An identity for the user ${userName} already exists in the wallet`);
            return;
        }

        const adminExists = await wallet.exists(appAdmin);
        if (!adminExists) {
            console.log(`An identity for the admin user ${appAdmin} does not exist in the wallet`);
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: appAdmin, discovery: gatewayDiscovery });

        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        const secret = await ca.register({ affiliation: 'org1', enrollmentID: userName, role: 'client' }, adminIdentity);

        const enrollment = await ca.enroll({ enrollmentID: userName, enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
        await wallet.put(userName, userIdentity);
        console.log('Successfully registered and enrolled admin user ' + userName + ' and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to register user + ${userName} + : ${error}`);
        process.exit(1);
    }
}

main();