'use strict';

import fetch from 'isomorphic-fetch';

export function createPrisoner(prisonerId, prisoner) {
  return fetch('/prison/api/create-prisoner', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ prisonerId, prisoner })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.message;
    } else {
      throw new Error(response.error);
    }
  });
}

export function getPrisoner(prisonerId) {
  return fetch(`/prison/api/get-prisoner/${prisonerId}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.prisoner;
    } else {
      throw new Error(response.error);
    }
  });
}

export function updatePrisoner(prisonerId, newPrisoner) {
  return fetch(`/prison/api/update-prisoner/${prisonerId}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ newPrisoner })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.message;
    } else {
      throw new Error(response.error);
    }
  });
}

export function deletePrisoner(prisonerId) {
  return fetch(`/prison/api/delete-prisoner/${prisonerId}`, {
    method: 'DELETE',
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

export function addSentence(prisonerId, sentence) {
  return fetch(`/prison/api/add-sentence/${prisonerId}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ sentence })
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.message;
    } else {
      throw new Error(response.error);
    }
  });
}

export function releasePrisoner(prisonerId) {
  return fetch(`/prison/api/release-prisoner/${prisonerId}`, {
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
