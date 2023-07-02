'use strict';

import fetch from 'isomorphic-fetch';

export function createInvestigation(id, caseNumber, description) {
  return fetch('/investigation/api/create-investigation', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ id, caseNumber, description })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.message;
    } else {
      throw new Error(response.error);
    }
  });
}

export function getInvestigation(id) {
  return fetch(`/investigation/api/get-investigation/${id}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.investigation;
    } else {
      throw new Error(response.error);
    }
  });
}

export function addEvidence(id, evidence) {
  return fetch(`/investigation/api/add-evidence/${id}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ evidence })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.message;
    } else {
      throw new Error(response.error);
    }
  });
}

export function assignInvestigator(id, investigator) {
  return fetch(`/investigation/api/assign-investigator/${id}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ investigator })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.message;
    } else {
      throw new Error(response.error);
    }
  });
}

export function changeInvestigationStatus(id, status) {
  return fetch(`/investigation/api/change-investigation-status/${id}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ status })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.message;
    } else {
      throw new Error(response.error);
    }
  });
}
