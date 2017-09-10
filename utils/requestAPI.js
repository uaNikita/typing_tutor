import 'whatwg-fetch';
import _ from 'lodash';

import { setTokens } from 'ReduxUtils/modules/user';
import store, { dispatch } from 'Utils/store';

const getBearerToken = () => {
  store.getState().getIn(['user', 'bearerToken']);
};

const getAccessToken = () => {
  store.getState().getIn(['user', 'accessToken']);
};

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

const requestJSON = (url, params, isOpenRoute) => {
  const newParams = _.merge({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }, params);

  if (isOpenRoute) {
    newParams.headers.Authorization = `bearer ${getAccessToken()}`;
  }

  if (typeof newParams.body === 'object') {
    newParams.body = JSON.stringify(newParams.body);
  }

  return fetch(url, newParams)
    .then(parseResponseAndHandleError);
};

export const fetchJSON = (url, params) => requestJSON(url, params)
  .catch(error => {
    let promise;

    if (error.status === 401) {
      promise = requestJSON('tokens', {
        Authorization: `bearer ${getBearerToken()}`,
      })
        .then(({ refresh, access }) => {
          dispatch(setTokens(refresh, access));

          return fetchJSON(url, params);
        });
    }
    else {
      promise = Promise.reject(error);
    }

    return promise;
  });

export const requestText = (url, params) => fetch(url, params)
  .then(parseResponseAndHandleError);
