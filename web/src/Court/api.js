import fetch from 'isomorphic-fetch';

export function getClaims(status) {
  return fetch('/court/api/claims', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ status })
  }).then(async res => {
    const claims = await res.json();
    return claims;
  });
}

export function processClaim(caseNumber, caseDetails) {
  return fetch('/court/api/process-claim', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ caseNumber, caseDetails })
  }).then(async res => {
    return await res.json();
  });
}

export function getCaseTypes() {
  return fetch('/court/api/case-types', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(async res => {
    return await res.json();
  });
}

export function createCaseType(caseType) {
  return fetch('/court/api/create-case-type', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(caseType)
  }).then(async res => {
    const response = await res.json();
    if (response.success) {
      return response.uuid;
    } else {
      throw new Error(response.error);
    }
  });
}

export function setActiveCaseType(uuid, active) {
  return fetch('/court/api/set-case-type-active', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ uuid, active })
  }).then(async res => {
    return await res.json();
  });
}

export function authenticateUser(user) {
  return fetch('/court/api/authenticate-user', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ user })
  }).then(async res => {
    let result = await res.json();
    if (result.error) {
      throw new Error("Invalid login!");
    } else {
      return result.success;
    }
  });
}

export function getCases(user) {
  return fetch('/court/api/cases', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ user })
  }).then(async res => {
    let result = await res.json();
    if (result.error) {
      throw new Error("Could not get cases!");
    }
    return result.cases;
  });
}

export function fileCase(user, caseTypeUuid, caseData) {
  return fetch('/court/api/file-case', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ user, caseTypeUuid, caseData })
  }).then(async res => {
    let result = await res.json();
    if (result.error) {
      throw new Error("Error occurred!");
    }
    return;
  });
}
