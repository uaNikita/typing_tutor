import * as types from '../constants/action-types/auth';

import {
  forEach
} from 'lodash';

const INITIAL_STATE = {
  email: '',
  loginLoading: false,
  regLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case types.SEND_LOGIN_REQUEST:
      return actionMetronome(state, action.action, action.value);

    case types.RECEIVE_LOGIN_ANSWER:
      return assign({}, state, {
        keyboardName: action.name
      });

    default:
      return state;
  }
};



