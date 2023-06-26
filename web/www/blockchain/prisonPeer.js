'use strict';

import config from './config';
import { wrapError, marshalArgs } from './utils';
import { prisonClient as client, isReady } from './setup';

import network from './invoke';

import * as util from 'util';

export async function createPrisoner(prisonerId, prisoner) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('createPrisoner', prisonerId, prisoner);
  } catch (e) {
    throw wrapError(`Error creating prisoner ${e.message}`, e);
  }
}

export async function getPrisoner(prisonerId) {
  if (!isReady()) {
    return;
  }
  try {
    const prisoner = await query('getPrisoner', prisonerId);
    return prisoner;
  } catch (e) {
    throw wrapError(`Error getting prisoner ${e.message}`, e);
  }
}

export async function updatePrisoner(prisonerId, newPrisoner) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('updatePrisoner', prisonerId, newPrisoner);
  } catch (e) {
    throw wrapError(`Error updating prisoner ${e.message}`, e);
  }
}

export async function deletePrisoner(prisonerId) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('deletePrisoner', prisonerId);
  } catch (e) {
    throw wrapError(`Error deleting prisoner ${e.message}`, e);
  }
}

export async function addSentence(prisonerId, sentence) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('addSentence', prisonerId, sentence);
  } catch (e) {
    throw wrapError(`Error adding sentence to prisoner ${e.message}`, e);
  }
}

export async function releasePrisoner(prisonerId) {
  if (!isReady()) {
    return;
  }
  try {
    await invoke('releasePrisoner', prisonerId);
  } catch (e) {
    throw wrapError(`Error releasing prisoner ${e.message}`, e);
  }
}

export const on = client.on.bind(client);
export const once = client.once.bind(client);
export const addListener = client.addListener.bind(client);
export const prependListener = client.prependListener.bind(client);
export const removeListener = client.removeListener.bind(client);

// Identity to use for submitting transactions to the smart contract
const peerType = 'prisonApp-admin';
let isQuery = false;

async function invoke(fcn, ...args) {
  isQuery = false;

  console.log(`Args in prisonPeer invoke: ${util.inspect(args)}`);
  console.log(`Function in prisonPeer invoke: ${util.inspect(fcn)}`);

  if (config.isCloud) {
    await network.invokeCC(isQuery, peerType, fcn, ...args);
  }

  return client.invoke(config.chaincodeId, config.chaincodeVersion, fcn, ...args);
}

async function query(fcn, ...args) {
  isQuery = true;

  console.log(`Args in prisonPeer query: ${util.inspect(args)}`);
  console.log(`Function in prisonPeer query: ${util.inspect(fcn)}`);

  if (config.isCloud) {
    await network.invokeCC(isQuery, peerType, fcn, ...args);
  }

  return client.query(config.chaincodeId, config.chaincodeVersion, fcn, ...args);
}
