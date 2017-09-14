import Immutable from 'immutable';
import { updateAuthCookie } from 'Utils/userCookie';


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
  updateAuthCookie({ email });

  return {
    type: SET_EMAIL,
    email,
  };
};

export const setName = name => {
  updateAuthCookie({ name });

  return {
    type: SET_NAME,
    name,
  };
};
