import Immutable from 'immutable';
import _ from 'lodash';

import { getIdsFromCharacter, normalizeString } from 'Utils';
import keyboards from 'Constants/keyboards/index';

import { fetchJSON } from './fetch';
import { setState as setUserState } from './user';
import {
  setState as setTextState,
  typeTextMode,
} from './modes/text';
import {
  setState as setLearningState,
  typeLearningMode,
  initLessons,
} from './modes/learning';

const SET_STATE = 'main/SET_STATE';
const CLEAR_STATE = 'main/CLEAR_STATE';
const PRESS_KEYS = 'main/PRESS_KEYS';
const UNPRESS_KEYS = 'main/UNPRESS_KEYS';
const ZEROING_STATISTIC = 'main/ZEROING_STATISTIC';
const SET_KEYS = 'main/SET_KEYS';
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
    presses: [],
    start: undefined,
  },

  hits: 0,

  typos: 0,

  idCharsToType: '',

  globalMessage: false,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.state);

    case CLEAR_STATE:
      return state.merge(initialState);

    case SET_KEYS:
      return state.set('keys', action.keys);

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
      return state.updateIn(['sessionStatistic', 'presses'], (presses) => {
        let type = 'typos';

        if (action.hit) {
          type = 'hits';
        }

        const index = presses.findIndex(c => c.get('character') === action.character);

        let updatedPresses;

        if (index === -1) {
          updatedPresses = presses.push(Immutable.Map({
            character: action.character,
            [type]: 1,
          }));
        }
        else {
          updatedPresses = presses.updateIn([index], (character) => {
            let updatedCharacter;

            if (character.get(type)) {
              updatedCharacter = character.updateIn([type], i => i + 1);
            }
            else {
              updatedCharacter = character.set(type, 1);
            }

            return updatedCharacter;
          });
        }

        return updatedPresses;
      });

    case ZEROING_STATISTIC:
      return state.set('sessionStatistic', Immutable.fromJS({
        presses: [],
        start: undefined,
      }));

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

export const setKeys = keys => ({
  type: SET_KEYS,
  keys,
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

export const setIdsCharToType = id => ({
  type: SET_IDS_CHAR_TO_TYPE,
  id,
});

export const addTouch = (hit, character) => ({
  type: ADD_TOUCH,
  hit,
  character,
});

export const zeroingStatic = () => ({
  type: ZEROING_STATISTIC,
});

export const setGlobalMessage = message => ({
  type: SET_GLOBAL_MESSAGE,
  message,
});

export const getKeysFromKeyboard = () => (
  (dispatch, getState) => {
    const name = getState().getIn(['user', 'keyboard']);
    const keys = Immutable.List(_.find(keyboards, { name }).keys);

    dispatch(setKeys(keys));
  }
);

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

export const typeChar = char => (
  (dispatch, getState) => {
    const state = getState();

    const normalizedChar = normalizeString(char);

    const idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), normalizedChar);

    dispatch(pressKeys(idsChar));

    // unpress keys
    setTimeout(() => {
      dispatch(unPressKeys(idsChar));

      dispatch(unPressWrongKeys(idsChar));
    }, 100);

    switch (state.getIn(['user', 'mode'])) {
      case 'text':
        dispatch(typeTextMode(normalizedChar));
        break;

      case 'learning':
        dispatch(typeLearningMode(normalizedChar));
        break;

      default:
    }
  }
);

export const init = () => (
  (dispatch) => {
    dispatch(initLessons());
  }
);

export const setData = data => (
  (dispatch) => {
    dispatch(setTextState(data.modes.text));

    console.log('data', data);

    const { modes: { learning } } = data;

    learning.fingers = { options: learning.fingers };
    learning.free = { options: learning.free };

    dispatch(setLearningState(learning));

    const userData = data;
    delete userData.modes;

    dispatch(setUserState(userData));
  }
);

// just for server
export const getData = options => (
  dispatch => (
    dispatch(fetchJSON('/user', { method: 'GET' }, options))
      .then((res) => {
        if (res.ok) {
          dispatch(setData(res.data));
        }

        return res;
      })
  )
);
