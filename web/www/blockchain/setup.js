'use strict';

import config, { DEFAULT_CONTRACT_TYPES } from './config';
import { OrganizationClient } from './utils';
import http from 'http';
import url from 'url';

let status = 'down';
let statusChangedCallbacks = [];

// Setup clients per organization
const investigationClient = new OrganizationClient(
  config.channelName,
  config.orderer0,
  config.investigationOrg.peer,
  config.investigationOrg.ca,
  config.investigationOrg.admin
);
const courtClient = new OrganizationClient(
  config.channelName,
  config.orderer0,
  config.courtOrg.peer,
  config.courtOrg.ca,
  config.courtOrg.admin
);
const prisonClient = new OrganizationClient(
  config.channelName,
  config.orderer0,
  config.prisonOrg.peer,
  config.prisonOrg.ca,
  config.prisonOrg.admin
);
const lawenforcementClient = new OrganizationClient(
  config.channelName,
  config.orderer0,
  config.lawenforcementOrg.peer,
  config.lawenforcementOrg.ca,
  config.lawenforcementOrg.admin
);

function setStatus(s) {
  status = s;

  setTimeout(() => {
    statusChangedCallbacks
      .filter(f => typeof f === 'function')
      .forEach(f => f(s));
  }, 1000);
}

export function subscribeStatus(cb) {
  if (typeof cb === 'function') {
    statusChangedCallbacks.push(cb);
  }
}

export function getStatus() {
  return status;
}

export function isReady() {
  return status === 'ready';
}

function getAdminOrgs() {
  return Promise.all([
    investigationClient.getOrgAdmin(),
    courtClient.getOrgAdmin(),
    prisonClient.getOrgAdmin(),
    lawenforcementClient.getOrgAdmin()
  ]);
}

(async () => {
  // Login
  try {
    await Promise.all([
      investigationClient.login(),
      courtClient.login(),
      prisonClient.login(),
      lawenforcementClient.login()
    ]);
  } catch (e) {
    console.log('Fatal error logging into blockchain organization clients!');
    console.log(e);
    process.exit(-1);
  }

  // Bootstrap blockchain network
  try {
    await getAdminOrgs();
    if (!(await investigationClient.checkChannelMembership())) {
      console.log('Default channel not found, attempting creation...');
      const createChannelResponse =
        await investigationClient.createChannel(config.channelConfig);
      if (createChannelResponse.status === 'SUCCESS') {
        console.log('Successfully created a new default channel.');
        console.log('Joining peers to the default channel.');
        await Promise.all([
          investigationClient.joinChannel(),
          courtClient.joinChannel(),
          prisonClient.joinChannel(),
          lawenforcementClient.joinChannel()
        ]);
        // Wait for 10s for the peers to join the newly created channel
        await new Promise(resolve => {
          setTimeout(resolve, 10000);
        });
      }
    }
  } catch (e) {
    console.log('Fatal error bootstrapping the blockchain network!');
    console.log(e);
    process.exit(-1);
  }

  // Register block events
  try {
    console.log('Connecting and Registering Block Events');
    investigationClient.connectAndRegisterBlockEvent();
    courtClient.connectAndRegisterBlockEvent();
    prisonClient.connectAndRegisterBlockEvent();
    lawenforcementClient.connectAndRegisterBlockEvent();
  } catch (e) {
  console.log('Fatal error register block event!');
  console.log(e);
  process.exit(-1);
  }

  // Initialize network
  try {
    await Promise.all([
      investigationClient.initialize(),
      courtClient.initialize(),
      prisonClient.initialize(),
      lawenforcementClient.initialize()
    ]);
  } catch (e) {
    console.log('Fatal error initializing blockchain organization clients!');
    console.log(e);
    process.exit(-1);
  }

  // Install chaincode on all peers
  let installedOninvestigationOrg, installedOncourtOrg, installedOnprisonOrg,
    installedOnlawenforcementOrg;
  try {
    await getAdminOrgs();
    installedOninvestigationOrg = await investigationClient.checkInstalled(
      config.chaincodeId, config.chaincodeVersion, config.chaincodePath);
    installedOncourtOrg = await courtClient.checkInstalled(
      config.chaincodeId, config.chaincodeVersion, config.chaincodePath);
    installedOnprisonOrg = await prisonClient.checkInstalled(
      config.chaincodeId, config.chaincodeVersion, config.chaincodePath);
    installedOnlawenforcementOrg = await lawenforcementClient.checkInstalled(
      config.chaincodeId, config.chaincodeVersion, config.chaincodePath);
  } catch (e) {
    console.log('Fatal error getting installation status of the chaincode!');
    console.log(e);
    process.exit(-1);
  }

  if (!(installedOninvestigationOrg && installedOncourtOrg &&
    installedOnprisonOrg && installedOnlawenforcementOrg)) {
    console.log('Chaincode is not installed, attempting installation...');

    // Pull chaincode environment base image
    try {
      await getAdminOrgs();
      const socketPath = process.env.DOCKER_SOCKET_PATH ||
      (process.platform === 'win32' ? '//./pipe/docker_engine' : '/var/run/docker.sock');
      const ccenvImage = process.env.DOCKER_CCENV_IMAGE ||
        'hyperledger/fabric-ccenv:latest';
      const listOpts = { socketPath, method: 'GET', path: '/images/json' };
      const pullOpts = {
        socketPath, method: 'POST',
        path: url.format({ pathname: '/images/create', query: { fromImage: ccenvImage } })
      };

      const images = await new Promise((resolve, reject) => {
        const req = http.request(listOpts, (response) => {
          let data = '';
          response.setEncoding('utf-8');
          response.on('data', chunk => { data += chunk; });
          response.on('end', () => { resolve(JSON.parse(data)); });
        });
        req.on('error', reject); req.end();
      });

      const imageExists = images.some(
        i => i.RepoTags && i.RepoTags.some(tag => tag === ccenvImage));
      if (!imageExists) {
        console.log(
          'Base container image not present, pulling from Docker Hub...');
        await new Promise((resolve, reject) => {
          const req = http.request(pullOpts, (response) => {
            response.on('data', () => { });
            response.on('end', () => { resolve(); });
          });
          req.on('error', reject); req.end();
        });
        console.log('Base container image downloaded.');
      } else {
        console.log('Base container image present.');
      }
    } catch (e) {
      console.log('Fatal error pulling docker images.');
      console.log(e);
      process.exit(-1);
    }

    // Install chaincode
    const installationPromises = [
      investigationClient.install(
        config.chaincodeId, config.chaincodeVersion, config.chaincodePath),
      courtClient.install(
        config.chaincodeId, config.chaincodeVersion, config.chaincodePath),
      prisonClient.install(
        config.chaincodeId, config.chaincodeVersion, config.chaincodePath),
      lawenforcementClient.install(
        config.chaincodeId, config.chaincodeVersion, config.chaincodePath)
    ];
    try {
      await Promise.all(installationPromises);
      await new Promise(resolve => {   setTimeout(resolve, 10000); });
      console.log('Successfully installed chaincode on the default channel.');
    } catch (e) {
      console.log('Fatal error installing chaincode on the default channel!');
      console.log(e);
      process.exit(-1);
    }

    // Instantiate chaincode on all peers
    // Instantiating the chaincode on a single peer should be enough (for now)
    try {
      // Initial contract types
      await investigationClient.instantiate(config.chaincodeId,
        config.chaincodeVersion, DEFAULT_CONTRACT_TYPES);
      console.log('Successfully instantiated chaincode on all peers.');
      setStatus('ready');
    } catch (e) {
      console.log('Fatal error instantiating chaincode on some(all) peers!');
      console.log(e);
      process.exit(-1);
    }
  } else {
    console.log('Chaincode already installed on the blockchain network.');
    setStatus('ready');
  }
})();

// Export organization clients
export {
  investigationClient,
  courtClient,
  prisonClient,
  lawenforcementClient
};
