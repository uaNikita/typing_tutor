import Immutable from 'immutable';
import _ from 'lodash';
import Cookie from 'js-cookie';

import { clearState as clearLearningState } from './modes/learning';
import { clearState as clearTextState } from './modes/text';
import { clearState as clearUserState } from './user';
import { clearState as clearMainState, setGlobalMessage } from './main';

const CLEAR_STATE = 'tokens/CLEAR_STATE';
const SET_REFRESH_TOKEN = 'fetch/SET_REFRESH_TOKEN';
const SET_ACCESS_TOKEN = 'fetch/SET_ACCESS_TOKEN';

const initialState = Immutable.Map({
  refreshToken: false,

  accessToken: false,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

    case SET_REFRESH_TOKEN:
      return state.set('refreshToken', action.token);

    case SET_ACCESS_TOKEN:
      return state.set('accessToken', action.token);

    default:
      return state;
  }
};

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const setRefreshToken = token => {
  Cookie.set('tt_refresh', token);

  return {
    type: SET_REFRESH_TOKEN,
    token,
  };
};

export const setAccessToken = token => {
  Cookie.set('tt_access', token);

  return {
    type: SET_ACCESS_TOKEN,
    token,
  };
};

export const setTokens = ({ refresh, access }) =>
  dispatch => {
    dispatch(setRefreshToken(refresh));
    dispatch(setAccessToken(access));
  };

const requestJSON =
  (url, params, withoutAuthorization) =>
    (dispatch, getState) => {
      const newParams = _.merge({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().getIn(['fetch', 'accessToken'])}`,
        },
      }, params);

      if (withoutAuthorization) {
        delete newParams.headers.Authorization;
      }

      if (typeof newParams.body === 'object') {
        newParams.body = JSON.stringify(newParams.body);
      }

      let reformedUrl = url;

      if (!BROWSER) {
        reformedUrl = `http://localhost:5550${reformedUrl}`;
      }

      return fetch(reformedUrl, newParams)
        .then(response => {
          const contentType = response.headers.get('content-type');

          if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json()
              .then(data => ({
                data,
                ok: response.ok,
                status: response.status,
              }))
          }

          return response;
        })
        .catch(error => {
          dispatch(setGlobalMessage('Oops... something went wrong'));

          throw error;
        });
    };

export const fetchJSON =
  (...args) =>
    (dispatch, getState) =>
      dispatch(requestJSON(...args))
        .then(response => {
          if (response.status === 401) {
            return dispatch(requestJSON('/auth/tokens', {
              headers: {
                Authorization: `Bearer ${getState().getIn(['fetch', 'refreshToken'])}`,
              },
            }))
              .then(response => {
                if (response.ok) {
                  dispatch(setRefreshToken(response.refresh));
                  dispatch(setAccessToken(response.access));

                  return dispatch(fetchJSON(...args));
                }
                else {
                  if (response.status === 401) {
                    dispatch(setGlobalMessage('You are not authorized for this request'));
                  }

                  dispatch(clearState());
                }
              });
          }

          return response;
        });

export const logOut = () => dispatch => {
  Cookie.remove('tt_refresh');
  Cookie.remove('tt_access');

  dispatch(clearState());
  dispatch(clearLearningState());
  dispatch(clearTextState());
  dispatch(clearUserState());
  dispatch(clearMainState());
};
