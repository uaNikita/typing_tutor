import Immutable from 'immutable';
import _ from 'lodash';

import temp from 'Utils/temp';

import { processAction } from './main';
import { fetchJSON } from './fetch';

const CLEAR_STATE = 'user/CLEAR_STATE';
const SET_STATE = 'user/SET_STATE';
const ADD_STATISTIC = 'user/ADD_STATISTIC';
const SET_HIDDEN_CHARS = 'user/SET_HIDDEN_CHARS';
const SET_METRONOME_OPTIONS = 'user/SET_METRONOME_OPTIONS';

const initialState = Immutable.fromJS({
  email: undefined,

  name: undefined,

  bio: undefined,

  statistic: [],

  // text, learning
  mode: 'text',

  showHiddenChars: true,

  metronome: {
    on: false,
    interval: 1200,
  },
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

    case SET_STATE:
      return state.merge(action.data);

    case ADD_STATISTIC:
      return state.mergeIn('statistic', action.statistic);

    case SET_HIDDEN_CHARS:
      return state.set('showHiddenChars', action.value);

    case SET_METRONOME_OPTIONS:
      return state.mergeIn(['metronome'], action.options);

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

export const setMetronomeOptions = options => ({
  type: SET_METRONOME_OPTIONS,
  options,
});

export const processSetSettings = settings => (
  (dispatch) => {
    dispatch(setState(settings));

    return dispatch(processAction(
      () => temp.assign({
        user: {
          ...settings,
        },
      }),
      () => dispatch(fetchJSON('/user', {
        method: 'PATCH',
        body: {
          ...settings,
        },
      })),
    ));
  }
);

export const addStatistic = obj => ({
  type: ADD_STATISTIC,
  ...obj,
});

export const processAddStatistic = () => (
  (dispatch, getState) => {
    const stateMain = getState().get('main');

    const body = {
      keyboard: stateMain.get('keyboard'),
      mode: stateMain.get('mode'),
      end: Date.now(),
      ...stateMain.get('sessionStatistic').toJS(),
    };

    dispatch(addStatistic(body));

    return dispatch(processAction(
      () => temp.path('user.statistic', getState().getIn(['main', 'statistic'])),
      () => dispatch(fetchJSON('/user/statistic', { body })),
    ));
  }
);

export const addStatisticWithTimeout = _.throttle(
  dispatch => dispatch(processAddStatistic()),
  2000,
  { leading: false },
);
