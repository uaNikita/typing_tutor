import Immutable from 'immutable';
import moment from 'moment';
import _ from 'lodash';

import temp from 'Utils/temp';

import { processAction } from './main';
import { fetchJSON } from './fetch';

const CLEAR_STATE = 'user/CLEAR_STATE';
const SET_STATE = 'user/SET_STATE';
const SET_STATISTIC = 'user/SET_STATISTIC';
const ADD_STATISTIC = 'user/ADD_STATISTIC';

const initialState = Immutable.fromJS({
  email: undefined,

  name: undefined,

  bio: undefined,

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

    case SET_STATISTIC:
      return state.set('statistic', Immutable.fromJS(action.statistic));

    case ADD_STATISTIC:
      return state.update('statistic', (dates) => {
        const thisDay = moment().startOf('day').toDate();

        let newDates = dates;

        let dateIndex = newDates.findIndex(date => date.get('date') === thisDay);

        if (dateIndex === -1) {
          newDates = dates.push(Immutable.fromJS({
            date: thisDay,
          }));

          dateIndex = newDates.count() - 1;
        }

        return newDates.updateIn([dateIndex, action.keyboard, action.mode], (mode) => {
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

export const setStatistic = statistic => ({
  type: SET_STATISTIC,
  statistic,
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
