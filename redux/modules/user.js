import Immutable from 'immutable';

const CLEAR_STATE = 'user/CLEAR_STATE';
const SET_DATA = 'user/SET_DATA';
const SET_EMAIL = 'user/SET_EMAIL';
const SET_NAME = 'user/SET_NAME';

const initialState = Immutable.Map({
  email: false,

  name: false,
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

