import Immutable from 'immutable';

import { fetchJSON } from './fetch';


const SET_EMAIL = 'user/SET_EMAIL';
const SET_NAME = 'user/SET_NAME';

const initialState = Immutable.Map({
  email: false,

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

export const setEmail = email => ({
  type: SET_EMAIL,
  email,
});

export const setName = name => ({
  type: SET_NAME,
  name,
});

export const getUserByRefreshToken = () =>
  dispatch =>
    dispatch(fetchJSON('/user'))
      .then(({ email, name }) => {
        dispatch(setEmail(email));

        if (name) {
          dispatch(setName(name));
        }
      });
