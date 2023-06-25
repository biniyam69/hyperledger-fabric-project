import { readFileSync } from 'fs';
import { resolve } from 'path';

const basePath = resolve(__dirname, '../../certs');
const readCryptoFile = (filename) =>
  readFileSync(resolve(basePath, filename)).toString();

const config = {
  isCloud: false,
  isUbuntu: true,
  channelName: 'default',
  channelConfig: readFileSync(resolve(__dirname, '../../channel.tx')),
  chaincodeId: 'bcins',
  chaincodeVersion: 'v2',
  chaincodePath: 'bcins',
  orderer0: {
    hostname: 'orderer0',
    url: 'grpcs://orderer0:7050',
    pem: readCryptoFile('ordererOrg.pem'),
  },
  courtOrg: {
    peer: {
      hostname: 'court-peer',
      url: 'grpcs://court-peer:7051',
      eventHubUrl: 'grpcs://court-peer:7053',
      pem: readCryptoFile('courtOrg.pem'),
    },
    ca: {
      hostname: 'court-ca',
      url: 'https://court-ca:7054',
      mspId: 'CourtOrgMSP',
    },
    admin: {
      key: readCryptoFile('Admin@court-org-key.pem'),
      cert: readCryptoFile('Admin@court-org-cert.pem'),
    },
  },
  prisonOrg: {
    peer: {
      hostname: 'prison-peer',
      url: 'grpcs://prison-peer:7051',
      eventHubUrl: 'grpcs://prison-peer:7053',
      pem: readCryptoFile('prisonOrg.pem'),
    },
    ca: {
      hostname: 'prison-ca',
      url: 'https://prison-ca:7054',
      mspId: 'PrisonOrgMSP',
    },
    admin: {
      key: readCryptoFile('Admin@prison-org-key.pem'),
      cert: readCryptoFile('Admin@prison-org-cert.pem'),
    },
  },
  lawEnforcementOrg: {
    peer: {
      hostname: 'law-enforcement-peer',
      url: 'grpcs://law-enforcement-peer:7051',
      eventHubUrl: 'grpcs://law-enforcement-peer:7053',
      pem: readCryptoFile('lawEnforcementOrg.pem'),
    },
    ca: {
      hostname: 'law-enforcement-ca',
      url: 'https://law-enforcement-ca:7054',
      mspId: 'LawEnforcementOrgMSP',
    },
    admin: {
      key: readCryptoFile('Admin@law-enforcement-org-key.pem'),
      cert: readCryptoFile('Admin@law-enforcement-org-cert.pem'),
    },
  },
  investigationOrg: {
    peer: {
      hostname: 'investigation-peer',
      url: 'grpcs://investigation-peer:7051',
      eventHubUrl: 'grpcs://investigation-peer:7053',
      pem: readCryptoFile('investigationOrg.pem'),
    },
    ca: {
      hostname: 'investigation-ca',
      url: 'https://investigation-ca:7054',
      mspId: 'InvestigationOrgMSP',
    },
    admin: {
      key: readCryptoFile('Admin@investigation-org-key.pem'),
      cert: readCryptoFile('Admin@investigation-org-cert.pem'),
    },
  },
};

if (process.env.LOCALCONFIG) {
  config.orderer0.url = 'grpcs://localhost:7050';

  config.courtOrg.peer.url = 'grpcs://localhost:7051';
  config.prisonOrg.peer.url = 'grpcs://localhost:8051';
  config.lawEnforcementOrg.peer.url = 'grpcs://localhost:9051';
  config.investigationOrg.peer.url = 'grpcs://localhost:10051';

  config.courtOrg.peer.eventHubUrl = 'grpcs://localhost:7053';
  config.prisonOrg.peer.eventHubUrl = 'grpcs://localhost:8053';
  config.lawEnforcementOrg.peer.eventHubUrl = 'grpcs://localhost:9053';
  config.investigationOrg.peer.eventHubUrl = 'grpcs://localhost:10053';

  config.courtOrg.ca.url = 'https://localhost:7054';
  config.prisonOrg.ca.url = 'https://localhost:8054';
  config.lawEnforcementOrg.ca.url = 'https://localhost:9054';
  config.investigationOrg.ca.url = 'https://localhost:10054';
}

export default config;

export const DEFAULT_CONTRACT_TYPES = [
  // Contract types definition remains unchanged
];
