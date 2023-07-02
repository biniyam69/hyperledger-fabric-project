'use strict';

import config from './config';
import { wrapError, marshalArgs } from './utils';
import { lawEnforcementClient as client, isReady } from './setup';

import network from './invoke';

import * as util from 'util'; // has no default export

export async function registerCriminalRecord(recordID, firstName, lastName, dateOfBirth, nationality, acquittals, offences, offenseDate, region, city ,subcity) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('registerCriminalRecord', recordID, firstName, lastName, dateOfBirth, nationality);
  } catch (e) {
    throw wrapError(`Error registering criminal record ${e.message}`, e);
  }
}

export async function updateCriminalRecord(recordID, offences, convictions, acquittals) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('updateCriminalRecord', recordID, offences, convictions, acquittals);
  } catch (e) {
    throw wrapError(`Error updating criminal record ${e.message}`, e);
  }
}

export async function getCriminalRecord(recordID) {
  if (!isReady()) {
    return;
  }
  try {
    return await query('getCriminalRecord', recordID);
  } catch (e) {
    throw wrapError(`Error getting criminal record ${e.message}`, e);
  }
}

export async function searchCriminalRecords(query) {
  if (!isReady()) {
    return;
  }
  try {
    return await query('searchCriminalRecords', query);
  } catch (e) {
    throw wrapError(`Error searching criminal records ${e.message}`, e);
  }
}

export async function analyzeCriminalRecords() {
  if (!isReady()) {
    return;
  }
  try {
    return await query('analyzeCriminalRecords');
  } catch (e) {
    throw wrapError(`Error analyzing criminal records ${e.message}`, e);
  }
}

export async function shareRecordInformation(recordID, recipient) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('shareRecordInformation', recordID, recipient);
  } catch (e) {
    throw wrapError(`Error sharing record information ${e.message}`, e);
  }
}

export const on = client.on.bind(client);
export const once = client.once.bind(client);
export const addListener = client.addListener.bind(client);
export const prependListener = client.prependListener.bind(client);
export const removeListener = client.removeListener.bind(client);

// Identity to use for submitting transactions to the smart contract
const peerType = 'lawEnforcementApp-admin';
let isQuery = false;

async function invoke(fcn, ...args) {
  isQuery = false;

  console.log(`args in lawEnforcementPeer invoke: ${util.inspect(...args)}`);
  console.log(`func in lawEnforcementPeer invoke: ${util.inspect(fcn)}`);

  if (config.isCloud) {
    await network.invokeCC(isQuery, peerType, fcn, ...args);
  }

  return client.invoke(config.chaincodeId, config.chaincodeVersion, fcn, ...args);
}

async function query(fcn, ...args) {
  isQuery = true;

  console.log(`args in lawEnforcementPeer query: ${util.inspect(...args)}`);
  console.log(`func in lawEnforcementPeer query: ${util.inspect(fcn)}`);

  if (config.isCloud) {
    await network.invokeCC(isQuery, peerType, fcn, ...args);
  }

  return client.query(config.chaincodeId, config.chaincodeVersion, fcn, ...args);
}
