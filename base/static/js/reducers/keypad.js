import * as types from '../constants/action_types';
import keyboards from '../constants/keyboards';
import {
  forEach,
  assign,
  clone,
  cloneDeep,
  map,
  random,
  times,
  find
} from 'lodash';

const INITIAL_STATE = {
  keyboardName: 'US',

  keyboards: keyboards,

  pressedRightIds: [],

  pressedWrongIds: [],

  startTypingTime: 1461228933292,

  successTypes: 0,

  errorTypes: 0,

  idCharsToType: '',

  metronomeStatus: 0,

  metronomeInterval: 800,

  // text, learning
  mode: 'learning',
};

const actionMetronome = (state, action, value) => {
  let newState;
  let status;
  let volume;

  switch (action) {
    case 'play':
      status = 1;
      break
    case 'stop':
      status = 1;
      break
    case 'interval':
      volume = value;
      break
  }

  if (status !== undefined) {
    newState = {
      metronomeStatus: status
    };
  } else {
    newState = {
      metronomeInterval: volume
    };
  }

  return assign({}, state, newState);
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_PRESSED_RIGHT_IDS:
      return assign({}, state, {
        pressedRightIds: action.ids
      });

    case types.SET_PRESSED_WRONG_IDS:
      return assign({}, state, {
        pressedWrongIds: action.ids
      });

    case types.SET_IDS_CHAR_TO_TYPE:
      return assign({}, state, {
        idCharsToType: action.id
      });

    case types.ADD_SUCCESS_TYPE:
      return assign({}, state, {
        successTypes: state.successTypes + 1
      });

    case types.ADD_ERROR_TYPE:
      return assign({}, state, {
        errorTypes: state.errorTypes + 1
      });

    case types.UPDATE_START_VARIABLES:
      return assign({}, state, {
        startTypingTime: Date.now(),
        successTypes: 0,
        errorTypes: 0,
      });

    case types.SET_MODE:
      return assign({}, state, {
        mode: action.mode
      });

    case types.ACTION_METRONOME:
      return actionMetronome(state, action.action, action.value);

    case types.SET_KEYBOARD:
      return assign({}, state, {
        keyboardName: action.name
      });

    default:
      return state;

  }
};



