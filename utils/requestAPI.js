import 'whatwg-fetch';
import _ from 'lodash';

const parseResponse = response => {
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }

  return response.text();
};

const parseResponseAndHandleError = response => {
  const res = parseResponse(response);

  if (response.ok) {
    return res;
  }

  return res.then(resError => {
    throw resError;
  });
};

export const requestJSON = (url, params) => {
  const newParams = _.merge({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }, params);

  if (typeof newParams.body === 'object') {
    newParams.body = JSON.stringify(newParams.body);
  }

  return fetch(url, newParams)
    .then(parseResponseAndHandleError);
};

export const requestText = (url, params) => fetch(url, params)
  .then(parseResponseAndHandleError);
