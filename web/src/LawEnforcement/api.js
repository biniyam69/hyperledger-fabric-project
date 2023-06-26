'use strict';

import fetch from 'isomorphic-fetch';

export function registerCriminalRecord(recordID, firstName, lastName, dateOfBirth, nationality) {
  return fetch('/law-enforcement/api/register-criminal-record', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ recordID, firstName, lastName, dateOfBirth, nationality })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.message;
    } else {
      throw new Error(response.error);
    }
  });
}

export function updateCriminalRecord(recordID, offences, convictions, acquittals) {
  return fetch(`/law-enforcement/api/update-criminal-record/${recordID}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ offences, convictions, acquittals })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.message;
    } else {
      throw new Error(response.error);
    }
  });
}

export function getCriminalRecord(recordID) {
  return fetch(`/law-enforcement/api/get-criminal-record/${recordID}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.record;
    } else {
      throw new Error(response.error);
    }
  });
}

export function searchCriminalRecords(query) {
  return fetch('/law-enforcement/api/search-criminal-records', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(query)
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.records;
    } else {
      throw new Error(response.error);
    }
  });
}

export function analyzeCriminalRecords() {
  return fetch('/law-enforcement/api/analyze-criminal-records', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.records;
    } else {
      throw new Error(response.error);
    }
  });
}

export function shareRecordInformation(recordID, recipient) {
  return fetch(`/law-enforcement/api/share-record-information/${recordID}/${recipient}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.message;
    } else {
      throw new Error(response.error);
    }
  });
}
