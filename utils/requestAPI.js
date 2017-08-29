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
    let error = new Error(response.statusText);

    error = {
      ...error,
      status: response.status,
      response: resError,
    };

    throw error;
  });
};

// const checkIsUnauthorized = error => {
//   if (error.status === 401) {
//     console.log(401);
//   }
//
//   if (error.status === 500) {
//     console.log(500);
//   }
//
//   throw error;
// };

export const requestJSON = (url, params) => fetch(url, _.merge({
  headers: {
    'Content-Type': 'application/json',
  },
}, params))
  .then(parseResponseAndHandleError);
// .catch(checkIsUnauthorized);

export const requestText = (url, params) => fetch(url, params)
  .then(parseResponseAndHandleError);
// .catch(checkIsUnauthorized);
