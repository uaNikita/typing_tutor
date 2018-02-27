import Immutable from 'immutable';
import moment from 'moment';

const CLEAR_STATE = 'user/CLEAR_STATE';
const SET_DATA = 'user/SET_DATA';
const SET_EMAIL = 'user/SET_EMAIL';
const SET_NAME = 'user/SET_NAME';
const ADD_STATISTIC = 'user/ADD_STATISTIC';

const initialState = Immutable.Map({
  email: undefined,

  name: undefined,

  statistic: [],
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

    case SET_DATA:
      return state.merge(action.data);

    case SET_EMAIL:
      return state.set('email', action.email);

    case SET_NAME:
      return state.set('name', action.name);

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

export const setData = data => ({
  type: SET_DATA,
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

export const addStatistic = obj => ({
  type: ADD_STATISTIC,
  ...obj,
});

