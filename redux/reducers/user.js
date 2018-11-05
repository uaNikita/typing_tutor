import Immutable from 'immutable';
import _ from 'lodash';

import { defaults, defaultsWhichCanBeOverwrittenByLS } from 'Constants/defaultState';
import { tempCookie, tempLocalStorage } from 'Utils';
import { processAction } from './main';
import { fetchJSON } from './fetch';

const CLEAR_STATE = 'user/CLEAR_STATE';
const SET_STATE = 'user/SET_STATE';
const ADD_STATISTIC = 'user/ADD_STATISTIC';
const SET_HIDDEN_CHARS = 'user/SET_HIDDEN_CHARS';

export default (state = Immutable.fromJS(defaults.user), action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(defaults.user, defaultsWhichCanBeOverwrittenByLS.user);

    case SET_STATE:
      return state.mergeDeep(action.data);

    case ADD_STATISTIC:
      return state.updateIn(['statistic'], (statistic) => {
        const index = statistic.findIndex(c => c.get('start') === action.statistic.start);

        let updatedstatistic;

        const immutableStatistic = Immutable.fromJS(action.statistic);

        if (index === -1) {
          updatedstatistic = statistic.push(immutableStatistic);
        }
        else {
          updatedstatistic = statistic.set(index, immutableStatistic);
        }

        return updatedstatistic;
      });

    case SET_HIDDEN_CHARS:
      return state.set('hiddenChars', action.value);

    default:
      return state;
  }
};

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const setState = data => ({
  type: SET_STATE,
  data,
});

export const setHiddenChars = value => ({
  type: SET_HIDDEN_CHARS,
  value,
});

export const processSetSettings = (() => {
  const deferredFetch = _.throttle(
    (dispatch, settings) => dispatch(fetchJSON('/user', {
      method: 'PATCH',
      body: settings,
    })),
    1000,
  );

  return settings => (dispatch) => {
    dispatch(setState(settings));

    return dispatch(processAction(
      () => tempCookie.assign({
        user: settings,
      }),
      () => deferredFetch(dispatch, settings),
    ));
  };
})();

export const addStatistic = statistic => ({
  type: ADD_STATISTIC,
  statistic,
});

export const processAddStatistic = (() => {
  const deferredFetch = _.throttle(
    (dispatch, body) => dispatch(fetchJSON('/user/statistic', { body })),
    2000,
  );

  return () => (dispatch, getState) => {
    const state = getState();
    const stateUser = state.get('user');

    const body = {
      keyboard: stateUser.get('keyboard'),
      mode: stateUser.get('mode'),
      end: Date.now(),
      ...state.getIn(['main', 'sessionStatistic']).toJS(),
    };

    dispatch(addStatistic(body));

    const statistic = getState().getIn(['user', 'statistic']).toJS();

    return dispatch(processAction(
      () => tempLocalStorage.path('user.statistic', statistic),
      () => deferredFetch(dispatch, body),
    ));
  };
})();
