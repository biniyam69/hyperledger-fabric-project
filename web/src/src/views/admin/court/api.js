import fetch from 'isomorphic-fetch';

export function createCase(caseNumber, caseDetails) {
  return fetch('/api/case', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ caseNumber, caseDetails })
  }).then(res => res.json());
}

export function getCase(caseNumber) {
  return fetch(`/api/case/${caseNumber}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json());
}

export function updateCaseStatus(caseNumber, newStatus) {
  return fetch(`/api/case/${caseNumber}/status`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ newStatus })
  }).then(res => res.json());
}

export function addPartyToCase(caseNumber, partyName) {
  return fetch(`/api/case/${caseNumber}/party`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ partyName })
  }).then(res => res.json());
}

export function scheduleHearing(caseNumber, hearingDate, hearingLocation) {
  return fetch(`/api/case/${caseNumber}/hearing`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ hearingDate, hearingLocation })
  }).then(res => res.json());
}

export function getCaseParties(caseNumber) {
  return fetch(`/api/case/${caseNumber}/parties`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json());
}

export function getCaseHearings(caseNumber) {
  return fetch(`/api/case/${caseNumber}/hearings`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json());
}

export function getAllCases() {
  return fetch('/api/cases', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json());
}