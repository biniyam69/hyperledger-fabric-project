import config from './config';
import { wrapError, marshalArgs } from './utils';
import { courtClient as client, isReady } from './setup';

import network from './invoke';

import * as util from 'util'; // has no default export

export async function createCase(caseNumber, caseDetails) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('createCase', caseNumber, caseDetails);
  } catch (e) {
    throw wrapError(`Error creating case ${e.message}`, e);
  }
}

export async function getCase(caseNumber) {
  if (!isReady()) {
    return;
  }
  try {
    const caseDetails = await query('getCase', caseNumber);
    return caseDetails;
  } catch (e) {
    throw wrapError(`Error getting case ${e.message}`, e);
  }
}

export async function updateCaseStatus(caseNumber, newStatus) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('updateCaseStatus', caseNumber, newStatus);
  } catch (e) {
    throw wrapError(`Error updating case status ${e.message}`, e);
  }
}

export async function addPartyToCase(caseNumber, partyName) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('addPartyToCase', caseNumber, partyName);
  } catch (e) {
    throw wrapError(`Error adding party to case ${e.message}`, e);
  }
}

export async function scheduleHearing(caseNumber, hearingDate, hearingLocation) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('scheduleHearing', caseNumber, hearingDate, hearingLocation);
  } catch (e) {
    throw wrapError(`Error scheduling hearing ${e.message}`, e);
  }
}

export async function getCaseParties(caseNumber) {
  if (!isReady()) {
    return;
  }
  try {
    const parties = await query('getCaseParties', caseNumber);
    return parties;
  } catch (e) {
    throw wrapError(`Error getting case parties ${e.message}`, e);
  }
}

export async function getCaseHearings(caseNumber) {
  if (!isReady()) {
    return;
  }
  try {
    const hearings = await query('getCaseHearings', caseNumber);
    return hearings;
  } catch (e) {
    throw wrapError(`Error getting case hearings ${e.message}`, e);
  }
}

export async function getAllCases() {
  if (!isReady()) {
    return;
  }
  try {
    const cases = await query('getAllCases');
    return cases;
  } catch (e) {
    throw wrapError(`Error getting all cases ${e.message}`, e);
  }
}

export const on = client.on.bind(client);
export const once = client.once.bind(client);
export const addListener = client.addListener.bind(client);
export const prependListener = client.prependListener.bind(client);
export const removeListener = client.removeListener.bind(client);

// Identity to use for submitting transactions to the smart contract
const peerType = 'courtApp-admin';
let isQuery = false;

async function invoke(fcn, ...args) {
  isQuery = false;

  console.log(`Args in courtPeer invoke: ${util.inspect(...args)}`);
  console.log(`Func in courtPeer invoke: ${util.inspect(fcn)}`);

  if (config.isCloud) {
    await network.invokeCC(isQuery, peerType, fcn, ...args);
  }

  return client.invoke(config.chaincodeId, config.chaincodeVersion, fcn, ...args);
}

async function query(fcn, ...args) {
  isQuery = true;

  console.log(`Args in courtPeer query: ${util.inspect(...args)}`);
  console.log(`Func in courtPeer query: ${util.inspect(fcn)}`);

  if (config.isCloud) {
    await network.invokeCC(isQuery, peerType, fcn, ...args);
  }

  return client.query(config.chaincodeId, config.chaincodeVersion, fcn, ...args);
}
