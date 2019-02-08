import Immutable from 'immutable';

import { defaults } from 'Constants/defaultState';

const CLEAR_STATE = 'race/CLEAR_STATE';
const SET_RACE = 'race/SET_RACE';
const SET_SOCKET = 'race/SET_SOCKET';

const initialState = Immutable.fromJS(defaults.race);

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

    case SET_SOCKET:
      return state.set('socket', action.socket);

    case SET_RACE:
      return state.set('active', action.id);

    default:
      return state;
  }
};

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const setRace = id => ({
  type: SET_RACE,
  id,
});

export const setSocket = socket => ({
  type: SET_SOCKET,
  socket,
});
