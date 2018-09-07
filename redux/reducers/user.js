import Immutable from 'immutable';
import _ from 'lodash';

import tempCookie from 'Utils/tempCookie';

import { processAction } from './main';
import { fetchJSON } from './fetch';

const CLEAR_STATE = 'user/CLEAR_STATE';
const SET_STATE = 'user/SET_STATE';
const ADD_STATISTIC = 'user/ADD_STATISTIC';
const SET_HIDDEN_CHARS = 'user/SET_HIDDEN_CHARS';

const initialState = Immutable.fromJS({
  email: undefined,

  name: undefined,

  bio: undefined,

  statistic: [],

  // text, learning
  mode: 'text',

  hiddenChars: true,

  metronome: {
    on: false,
    interval: 1200,
  },
});

console.log(1, initialState.mergeDeep({bio:6}).toJS());

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

    case SET_STATE:
      console.log('data', action.data);
      console.log('state', state.toJS());
      console.log('SET_STATE', state.mergeDeep(action.data).toJS());

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
    const stateMain = getState().get('main');

    const body = {
      keyboard: stateMain.get('keyboard'),
      mode: stateMain.get('mode'),
      end: Date.now(),
      ...stateMain.get('sessionStatistic').toJS(),
    };

    dispatch(addStatistic(body));

    return dispatch(processAction(
      () => tempCookie.path('user.statistic', getState().getIn(['main', 'statistic'])),
      () => deferredFetch(dispatch, body),
    ));
  };
})();
