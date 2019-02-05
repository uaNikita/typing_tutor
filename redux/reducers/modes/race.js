import Immutable from 'immutable';

import { defaults } from 'Constants/defaultState';

const CLEAR_STATE = 'race/CLEAR_STATE';
const SET_RACE = 'race/SET_RACE';

const initialState = Immutable.fromJS(defaults.race);

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

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
