import Immutable from 'immutable';
import _ from 'lodash';

import { getIdsFromCharacter } from 'Utils';
import keyboards from 'Constants/keyboards/index';

import { fetchJSON, setTokens } from './fetch';
import { setState as setUserState } from './user';
import {
  setState as setTextState,
  typeTextMode,
} from './modes/text';
import {
  typeLearningMode,
  initLessons,
} from './modes/learning';

const SET_STATE = 'main/SET_STATE';
const CLEAR_STATE = 'main/CLEAR_STATE';
const PRESS_KEYS = 'main/PRESS_KEYS';
const UNPRESS_KEYS = 'main/UNPRESS_KEYS';
const ZEROING_STATISTIC = 'main/ZEROING_STATISTIC';
const ACTION_METRONOME = 'main/ACTION_METRONOME';
const SET_KEYBOARD = 'main/SET_KEYBOARD';
const PRESS_WRONG_KEYS = 'main/PRESS_WRONG_KEYS';
const UNPRESS_WRONG_KEYS = 'main/UNPRESS_WRONG_KEYS';
const SET_START_TYPING_TIME = 'main/SET_START_TYPING_TIME';
const SET_IDS_CHAR_TO_TYPE = 'main/SET_IDS_CHAR_TO_TYPE';
const ADD_TOUCH = 'main/ADD_TOUCH';
const SET_GLOBAL_MESSAGE = 'main/SET_GLOBAL_MESSAGE';

const initialState = Immutable.fromJS({
  keyboard: 'english',

  keys: _.find(keyboards, { name: 'english' }).keys,

  pressedKeys: Immutable.Set([]),

  pressedWrongKeys: Immutable.Set([]),

  sessionStatistic: {
    hits: [],
    typos: [],
    start: undefined,
  },

  hits: 0,

  typos: 0,

  idCharsToType: '',

  metronomeStatus: 0,

  metronomeInterval: 800,

  // text, learning
  mode: 'text',

  globalMessage: false,

  lastNoModalLocation: undefined,

  isModal: false,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.state);

    case CLEAR_STATE:
      return state.mergeWith((prev, next, key) => {
        let prop = next;

        if (!next && ['lastNoModalLocation', 'isModal'].includes(key)) {
          prop = prev;
        }

        return prop;
      }, initialState);

    case PRESS_KEYS:
      return state.update('pressedKeys', keys => keys.union(action.ids));

    case UNPRESS_KEYS:
      return state.update('pressedKeys', keys => keys.subtract(action.ids));

    case PRESS_WRONG_KEYS:
      return state.update('pressedWrongKeys', keys => keys.union(action.ids));

    case UNPRESS_WRONG_KEYS:
      return state.update('pressedWrongKeys', keys => keys.subtract(action.ids));

    case SET_START_TYPING_TIME:
      return state.setIn(['sessionStatistic', 'start'], action.time);

    case SET_IDS_CHAR_TO_TYPE:
      return state.set('idCharsToType', action.id);

    case ADD_TOUCH:
      return state.updateIn(['sessionStatistic', `${action.touchType}s`], (presses) => {
        const index = presses.findIndex(c => c.get('character') === action.character);

        let newPresses;

        if (index === -1) {
          newPresses = presses.push(Immutable.Map({
            character: action.character,
            presses: 1,
          }));
        }
        else {
          newPresses = presses.updateIn([index, 'presses'], p => p + 1);
        }

        return newPresses;
      });

    case ZEROING_STATISTIC:
      return state.set('sessionStatistic', Immutable.fromJS({
        hits: [],
        typos: [],
        start: undefined,
      }));

    case ACTION_METRONOME:
      return state.set('metronomeStatus', 0);

    case SET_KEYBOARD:
      return state.merge({
        keyboard: action.name,
        keys: Immutable.List(_.find(keyboards, { name: action.name }).keys),
      });

    case SET_GLOBAL_MESSAGE:
      return state.set('globalMessage', action.message);

    default:
      return state;
  }
};

export const setState = () => ({
  type: SET_STATE,
});

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const pressKeys = ids => ({
  type: PRESS_KEYS,
  ids,
});

export const unPressKeys = ids => ({
  type: UNPRESS_KEYS,
  ids,
});

export const pressWrongKeys = ids => ({
  type: PRESS_WRONG_KEYS,
  ids,
});

export const unPressWrongKeys = ids => ({
  type: UNPRESS_WRONG_KEYS,
  ids,
});

export const setStartTypingTime = time => ({
  type: SET_START_TYPING_TIME,
  time,
});

export const actionMetronome = (action, value) => ({
  type: ACTION_METRONOME,
  action,
  value,
});

export const setKeyboard = name => ({
  type: SET_KEYBOARD,
  name,
});

export const setIdsCharToType = id => ({
  type: SET_IDS_CHAR_TO_TYPE,
  id,
});

export const addTouch = (touchType, character) => ({
  type: ADD_TOUCH,
  touchType,
  character,
});

export const zeroingStatic = () => ({
  type: ZEROING_STATISTIC,
});

export const setGlobalMessage = message => ({
  type: SET_GLOBAL_MESSAGE,
  message,
});

export const processAction = (saveToClient, saveToServer) => (
  (dispatch, getState) => {
    let promise = Promise.resolve();

    if (getState().getIn(['user', 'email'])) {
      promise = saveToServer();
    }
    else {
      saveToClient();
    }

    return promise;
  }
);

export const typeChar = char => (dispatch, getState) => {
  const state = getState();

  const idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), char);

  dispatch(pressKeys(idsChar));

  // unpress keys
  setTimeout(() => {
    dispatch(unPressKeys(idsChar));

    dispatch(unPressWrongKeys(idsChar));
  }, 100);

  switch (state.getIn(['user', 'mode'])) {
    case 'text':
      dispatch(typeTextMode(char));
      break;

    case 'learning':
      dispatch(typeLearningMode(char));
      break;

    default:
  }
};

export const init = () => (
  (dispatch) => {
    dispatch(initLessons());
  }
);

export const setAllWithoutAuth = data => (
  (dispatch) => {
    dispatch(setTextState(data.modes.text));

    const userData = data;
    delete userData.modes;

    dispatch(setUserState(userData));

    dispatch(init());
  }
);

export const setAllWithAuth = ({ tokens, ...rest }) => (
  (dispatch) => {
    dispatch(setTokens(tokens));

    dispatch(setAllWithoutAuth(rest));
  }
);

export const requestAllWithoutAuth = () => (
  dispatch => (
    dispatch(fetchJSON('/user', { method: 'GET' }))
      .then((res) => {
        if (res.ok) {
          dispatch(setAllWithoutAuth(res.data));
        }

        return res;
      })
  )
);
