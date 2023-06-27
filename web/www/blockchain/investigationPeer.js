'use strict';

import config from './config';
import { wrapError, marshalArgs } from './utils';
import { investigationClient as client, isReady } from './setup';

import network from './invoke';

import * as util from 'util'; // has no default export

export async function createInvestigation(id, caseNumber, description) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('createInvestigation', id, caseNumber, description);
  } catch (e) {
    throw wrapError(`Error creating investigation ${e.message}`, e);
  }
}

export async function getInvestigation(id) {
  if (!isReady()) {
    return;
  }
  try {
    return await query('getInvestigation', id);
  } catch (e) {
    throw wrapError(`Error getting investigation ${e.message}`, e);
  }
}

export async function addEvidence(id, evidence) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('addEvidence', id, evidence);
  } catch (e) {
    throw wrapError(`Error adding evidence to investigation ${e.message}`, e);
  }
}

export async function assignInvestigator(id, investigator) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('assignInvestigator', id, investigator);
  } catch (e) {
    throw wrapError(`Error assigning investigator to investigation ${e.message}`, e);
  }
}

export async function changeInvestigationStatus(id, status) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('changeInvestigationStatus', id, status);
  } catch (e) {
    throw wrapError(`Error changing investigation status ${e.message}`, e);
  }
}

export const on = client.on.bind(client);
export const once = client.once.bind(client);
export const addListener = client.addListener.bind(client);
export const prependListener = client.prependListener.bind(client);
export const removeListener = client.removeListener.bind(client);

// Identity to use for submitting transactions to the smart contract
const peerType = 'investigationApp-admin';
let isQuery = false;

async function invoke(fcn, ...args) {
  isQuery = false;

  console.log(`args in investigationPeer invoke: ${util.inspect(...args)}`);
  console.log(`func in investigationPeer invoke: ${util.inspect(fcn)}`);

  if (config.isCloud) {
    await network.invokeCC(isQuery, peerType, fcn, ...args);
  }

  return client.invoke(config.chaincodeId, config.chaincodeVersion, fcn, ...args);
}

async function query(fcn, ...args) {
  isQuery = true;

  console.log(`args in investigationPeer query: ${util.inspect(...args)}`);
  console.log(`func in investigationPeer query: ${util.inspect(fcn)}`);

  if (config.isCloud) {
    await network.invokeCC(isQuery, peerType, fcn, ...args);
  }

  return client.query(config.chaincodeId, config.chaincodeVersion, fcn, ...args);
}
