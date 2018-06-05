import Immutable from 'immutable';
import moment from 'moment';
import _ from 'lodash';

import temp from 'Utils/temp';

import { processAction } from './main';
import { fetchJSON } from './fetch';

const CLEAR_STATE = 'user/CLEAR_STATE';
const SET_STATE = 'user/SET_STATE';
const SET_EMAIL = 'user/SET_EMAIL';
const SET_NAME = 'user/SET_NAME';
const SET_MODE = 'user/SET_MODE';
const SET_STATISTIC = 'user/SET_STATISTIC';
const ADD_STATISTIC = 'user/ADD_STATISTIC';

const initialState = Immutable.fromJS({
  email: undefined,

  name: undefined,

  statistic: [],

  // text, learning
  mode: 'text',
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

    case SET_STATE:
      return state.merge(action.data);

    case SET_EMAIL:
      return state.set('email', action.email);

    case SET_NAME:
      return state.set('name', action.name);

    case SET_MODE:
      return state.set('mode', action.mode);

    case SET_STATISTIC:
      return state.set('statistic', Immutable.fromJS(action.statistic));

    case ADD_STATISTIC:
      return state.update('statistic', dates => {
        const thisDay = moment().startOf('day').toDate();

        let newDates = dates;

        let dateIndex = newDates.findIndex(date => date.get('date') === thisDay);

        if (dateIndex === -1) {
          newDates = dates.push(Immutable.fromJS({
            date: thisDay,
          }));

          dateIndex = newDates.count() - 1;
        }

        return newDates.updateIn([dateIndex, action.keyboard, action.mode], mode => {
          let newMode = mode;

          if (!newMode) {
            newMode = Immutable.List([]);
          }

          newMode.set(action.sessionId, Immutable.Map(action.statistic));
        });
      });

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

export const setEmail = email => ({
  type: SET_EMAIL,
  email,
});

export const setName = name => ({
  type: SET_NAME,
  name,
});

export const setMode = mode => ({
  type: SET_MODE,
  mode,
});

export const setStatistic = statistic => ({
  type: ADD_STATISTIC,
  statistic,
});

export const addStatistic = obj => ({
  type: ADD_STATISTIC,
  ...obj,
});

export const processSetMode = mode =>
  dispatch => {
    dispatch(setMode(mode));

    return dispatch(processAction(
      () => temp.path('mode', mode),
      () => dispatch(fetchJSON('/profile/mode', { mode })),
    ));
  };

export const processAddStatistic = () =>
  (dispatch, getState) => {
    const stateMain = getState().get('main');

    const body = {
      keyboard: stateMain.get('keyboard'),
      mode: stateMain.get('mode'),
      sessionId: stateMain.get('sessionId'),
      statistic: {
        ...stateMain.get('sessionStatistic').toJS(),
        end: Date.now(),
      },
    };

    dispatch(addStatistic(body));

    return dispatch(processAction(
      () => temp.path('statistic', getState().getIn(['main', 'statistic'])),
      () => dispatch(fetchJSON('/profile/statistic', { body })),
    ));
  };

export const addStatisticWithTimeout = _.throttle(
  dispatch => dispatch(processAddStatistic()),
  2000,
  { leading: false },
);
