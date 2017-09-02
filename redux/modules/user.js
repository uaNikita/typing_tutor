import Immutable from 'immutable';

const SET_EMAIL = 'user/SET_EMAIL';
const SET_BEARER_TOKEN = 'user/SET_BEARER_TOKEN';
const SET_ACCESS_TOKEN = 'user/SET_ACCESS_TOKEN';
const SET_NAME = 'user/SET_NAME';

const initialState = Immutable.Map({
  email: false,

  bearerToken: false,

  accessToken: false,

  name: false,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_EMAIL:
      return state.set('email', action.email);

    case SET_BEARER_TOKEN:
      return state.set('bearerToken', action.token);

    case SET_ACCESS_TOKEN:
      return state.set('accessToken', action.email);

    case SET_NAME:
      return state.set('name', action.name);

    default:
      return state;
  }
};

export const setEmail = email => ({
  type: SET_EMAIL,
  email,
});

export const setBearerToken = token => ({
  type: SET_BEARER_TOKEN,
  token,
});

export const setAccessToken = token => ({
  type: SET_ACCESS_TOKEN,
  token,
});

export const setName = name => ({
  type: SET_NAME,
  name,
});
