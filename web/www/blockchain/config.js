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
  {
    uuid: '63ef076a-33a1-41d2-a9bc-2777505b014f',
    shopType: 'B',
    formulaPerDay: 'price * 0.01 + 0.05',
    maxSumInsured: 4300.00,
    theftInsured: true,
    description: 'Contract for Mountain Bikers',
    conditions: 'Contract Terms here',
    minDurationDays: 1,
    maxDurationDays: 7,
    active: true
  },
  {
    uuid: '1d640cf7-9808-4c78-b7f0-55aaad02e9e5',
    shopType: 'B',
    formulaPerDay: 'price * 0.02',
    maxSumInsured: 3500.00,
    theftInsured: false,
    description: 'Insure Your Bike',
    conditions: 'Simple contract terms.',
    minDurationDays: 3,
    maxDurationDays: 10,
    active: true
  },
  {
    uuid: '17210a72-f505-42bf-a238-65c8898477e1',
    shopType: 'P',
    formulaPerDay: 'price * 0.001 + 5.00',
    maxSumInsured: 1500.00,
    theftInsured: true,
    description: 'Phone Insurance Contract',
    conditions: 'Exemplary contract terms here.',
    minDurationDays: 5,
    maxDurationDays: 10,
    active: true
  },
  {
    uuid: '17d773dc-2624-4c22-a478-87544dd0a17f',
    shopType: 'P',
    formulaPerDay: 'price * 0.005 + 10.00',
    maxSumInsured: 2500.00,
    theftInsured: true,
    description: 'Premium SmartPhone Insurance',
    conditions: 'Only for premium phone owners.',
    minDurationDays: 10,
    maxDurationDays: 20,
    active: true
  },
  {
    uuid: 'd804f730-8c77-4583-9247-ec9e753643db',
    shopType: 'S',
    formulaPerDay: '25.00',
    maxSumInsured: 5000.00,
    theftInsured: false,
    description: 'Short-Term Ski Insurance',
    conditions: 'Simple contract terms here.',
    minDurationDays: 3,
    maxDurationDays: 25,
    active: true
  },
  {
    uuid: 'dcee27d7-bf3c-4995-a272-8a306a35e51f',
    shopType: 'S',
    formulaPerDay: 'price * 0.001 + 10.00',
    maxSumInsured: 3000.00,
    theftInsured: true,
    description: 'Insure Ur Ski',
    conditions: 'Just do it.',
    minDurationDays: 1,
    maxDurationDays: 15,
    active: true
  },
  {
    uuid: 'c06f95d6-9b90-4d24-b8cb-f347d1b33ddf',
    shopType: 'BPS',
    formulaPerDay: '50',
    maxSumInsured: 3000.00,
    theftInsured: false,
    description: 'Universal Insurance Contract',
    conditions: 'Universal Contract Terms here. For all types of goods.',
    minDurationDays: 1,
    maxDurationDays: 10,
    active: true
  }
];
