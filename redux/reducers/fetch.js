import Immutable from 'immutable';
import _ from 'lodash';
import Cookies from 'js-cookie';

import { defaults } from 'Constants/defaultState';
import { tempCookie, tempLocalStorage } from 'Utils';

import { clearState as clearLearningState } from './modes/learning';
import { clearState as clearTextState } from './modes/text';
import { clearState as clearUserState } from './user';
import { clearState as clearMainState, setGlobalMessage } from './main';

const CLEAR_STATE = 'tokens/CLEAR_STATE';
const SET_REFRESH_TOKEN = 'fetch/SET_REFRESH_TOKEN';
const SET_ACCESS_TOKEN = 'fetch/SET_ACCESS_TOKEN';

const initialState = Immutable.Map(defaults.fetch);

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

export const setRefreshToken = (token) => {
  Cookies.set('tt_refresh', token);

  return {
    type: SET_REFRESH_TOKEN,
    token,
  };
};

export const setAccessToken = (token) => {
  Cookies.set('tt_access', token);

  return {
    type: SET_ACCESS_TOKEN,
    token,
  };
};

export const setTokens = ({ refresh, access }) => (
  (dispatch) => {
    dispatch(setRefreshToken(refresh));
    dispatch(setAccessToken(access));
  }
);


export const clearAppData = () => (dispatch) => {
  tempCookie.clear();
  tempLocalStorage.clear();

  dispatch(clearState());
  dispatch(clearMainState());
  dispatch(clearUserState());
  dispatch(clearLearningState());
  dispatch(clearTextState());
};

const requestJSON = (url, params, opts) => (
  (dispatch, getState) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const options = opts || {};

    if (!options.withoutAuthorization) {
      headers.Authorization = `Bearer ${getState().getIn(['fetch', 'accessToken'])}`;
    }

    const newParams = _.merge({
      method: 'POST',
      headers,
    }, params);

    if (typeof newParams.body === 'object') {
      newParams.body = JSON.stringify(newParams.body);
    }

    let reformedUrl = url;

    if (!BROWSER) {
      reformedUrl = `http://localhost:5550${reformedUrl}`;
    }

    return fetch(reformedUrl, newParams)
      .then((response) => {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json()
            .then(data => ({
              data,
              ok: response.ok,
              status: response.status,
            }));
        }

        return response;
      })
      .catch((error) => {
        dispatch(setGlobalMessage('Oops... something went wrong'));

        throw error;
      });
  }
);

export const fetchJSON = (...args) => (
  (dispatch, getState) => (
    dispatch(requestJSON(...args))
      .then((response) => {
        if (response.status === 401) {
          return dispatch(requestJSON('/auth/tokens', {
            body: {
              token: getState().getIn(['fetch', 'refreshToken']),
            },
          }))
            .then((refreshTokenResponse) => {
              const {
                status,
                ok,
                data,
              } = refreshTokenResponse;

              if (ok) {
                dispatch(setRefreshToken(data.refresh));
                dispatch(setAccessToken(data.access));

                // check for responseFromServer in options argument
                if (args[2]) {
                  const { responseFromServer } = args[2];

                  if (responseFromServer) {
                    responseFromServer.cookie('tt_refresh', getState().getIn(['fetch', 'refreshToken']));
                    responseFromServer.cookie('tt_access', getState().getIn(['fetch', 'accessToken']));
                  }
                }

                return dispatch(fetchJSON(...args));
              }

              if (status === 401) {
                dispatch(setGlobalMessage('You are not authorized for this request'));

                Cookies.remove('tt_refresh');
                Cookies.remove('tt_access');

                dispatch(clearAppData());
              }

              return refreshTokenResponse;
            });
        }

        return response;
      })
  )
);

export const logOut = () => (
  (dispatch, getState) => (
    dispatch(fetchJSON('/auth/logout', {
      body: {
        token: getState().getIn(['fetch', 'refreshToken']),
      },
    }))
      .then((res) => {
        if (res.ok) {
          Cookies.remove('tt_refresh');
          Cookies.remove('tt_access');

          dispatch(clearAppData());
        }
      })
  )
);
