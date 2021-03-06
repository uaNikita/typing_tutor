import Immutable from 'immutable';
import _ from 'lodash';
import Cookies from 'js-cookie';

import { defaults } from 'Constants/defaultState';
import { tempCookie, tempLocalStorage } from 'Utils';

import { clearState as clearSyllableState } from './modes/syllable';
import { clearState as clearTextState } from './modes/text';
import { clearState as clearUserState } from './user';
import { clearState as clearMainState, setGlobalMessage, init } from './main';

const SET_STATE = 'fetch/SET_STATE';
const CLEAR_STATE = 'fetch/CLEAR_STATE';

const initialState = Immutable.Map(defaults.fetch);

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.state);

    case CLEAR_STATE:
      return state.merge(initialState);

    default:
      return state;
  }
};

export const setState = state => {
  if (state.refreshToken) {
    Cookies.set('tt_refresh', state.refreshToken);
  }

  if (state.accessToken) {
    Cookies.set('tt_access', state.accessToken);
  }

  if (state.anonymousToken) {
    Cookies.set('tt_anonymous', state.anonymousToken);
  }
  else if (_.isNull(state.anonymousToken)) {
    Cookies.remove('tt_anonymous');
  }

  return {
    type: SET_STATE,
    state,
  };
};

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const clearAppData = () => dispatch => {
  Cookies.remove('tt_refresh');
  Cookies.remove('tt_access');
  Cookies.remove('tt_anonymous');

  tempCookie.clear();
  tempLocalStorage.clear();

  dispatch(clearState());
  dispatch(clearMainState());
  dispatch(clearUserState());
  dispatch(clearSyllableState());
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
      .then(response => {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          return response.json()
            .then(data => ({
              data,
              ok: response.ok,
              status: response.status,
            }));
        }

        return response;
      })
      .catch(error => {
        dispatch(setGlobalMessage('Oops... something went wrong'));

        throw error;
      });
  }
);

export const fetchJSON = (...args) => (
  (dispatch, getState) => (
    dispatch(requestJSON(...args))
      .then(response => {
        if (response.status === 401) {
          return dispatch(requestJSON('/auth/tokens', {
            body: {
              token: getState().getIn(['fetch', 'refreshToken']),
            },
          }))
            .then(refreshTokenResponse => {
              const {
                status,
                ok,
                data,
              } = refreshTokenResponse;

              let result = refreshTokenResponse;

              if (ok) {
                dispatch(setState({
                  refreshToken: data.refresh,
                  accessToken: data.access,
                }));

                // check for responseFromServer in options argument
                if (args[2]) {
                  const { responseFromServer } = args[2];

                  if (responseFromServer) {
                    responseFromServer.cookie('tt_refresh', getState().getIn(['fetch', 'refreshToken']));
                    responseFromServer.cookie('tt_access', getState().getIn(['fetch', 'accessToken']));
                  }
                }

                result = dispatch(fetchJSON(...args));
              }
              else if (status === 401) {
                dispatch(setGlobalMessage('You are not authorized for this request'));

                dispatch(clearAppData());
              }

              return result;
            });
        }

        return response;
      })
  )
);

export const getNewTokens = () => (
  (dispatch, getState) => (
    dispatch(requestJSON('/auth/tokens', {
      body: {
        token: getState().getIn(['fetch', 'refreshToken']),
      },
    }))
      .then(refreshTokenResponse => {
        const {
          status,
          ok,
          data,
        } = refreshTokenResponse;

        if (ok) {
          dispatch(setState({
            refreshToken: data.refresh,
            accessToken: data.access,
          }));
        }
        else if (status === 401) {
          dispatch(setGlobalMessage('You are not authorized for this request'));

          dispatch(clearAppData());
        }

        return refreshTokenResponse;
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
      .then(res => {
        if (res.ok) {
          dispatch(clearAppData());

          dispatch(init());
        }
      })
  )
);
