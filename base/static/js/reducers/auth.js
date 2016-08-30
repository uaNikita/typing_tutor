import {SEND_LOGIN_REQUEST, RECEIVE_LOGIN_ANSWER} from '../constants/action_types';
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

    case SEND_LOGIN_REQUEST:
      return actionMetronome(state, action.action, action.value);

    case RECEIVE_LOGIN_ANSWER:
      return assign({}, state, {
        keyboardName: action.name
      });

    default:
      return state;

  }
};



