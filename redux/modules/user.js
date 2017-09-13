import Immutable from 'immutable';

const SET_EMAIL = 'user/SET_EMAIL';

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


    case SET_NAME:
      return state.set('name', action.name);

    default:
      return state;
  }
};

export const setEmail = email => {
  localStorage.setItem('email', email);

  return {
    type: SET_EMAIL,
    email,
  };
};

export const setName = name => {
  localStorage.setItem('name', name);

  return {
    type: SET_NAME,
    name,
  };
};
