import Immutable from 'immutable';
import moment from 'moment';
import _ from 'lodash';

import { getIdsFromCharacter } from 'Utils';
import keyboards from '../../constants/keyboards';

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
const ADD_HIT = 'main/ADD_HIT';
const ADD_TYPO = 'main/ADD_TYPO';
const SET_GLOBAL_MESSAGE = 'main/SET_GLOBAL_MESSAGE';
const SET_LAST_NO_MODAL_LOCATION = 'main/SET_LAST_NO_MODAL_LOCATION';
const SET_IS_MODAL = 'main/SET_IS_MODAL';
const SET_SESSION_ID = 'main/SET_SESSION_ID';

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

  sessionId: undefined,
});

const updateSessionStatisticPresses = (state, name, character) =>
  state.updateIn(['sessionStatistic', name], presses => {
    const index = presses.findIndex(c => c.get('character') === character);

    let newPresses;

    if (index === -1) {
      newPresses = presses.push(Immutable.Map({
        character,
        presses: 1,
      }));
    }
    else {
      newPresses = presses.updateIn([index, 'presses'], p => p + 1);
    }

    return newPresses;
  });

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.state);

    case CLEAR_STATE:
      return state.merge(initialState);

    case PRESS_KEYS:
      return state.update('pressedKeys', keys => keys.union(action.ids));

    case UNPRESS_KEYS:
      return state.update('pressedKeys', keys => keys.subtract(action.ids));

    case PRESS_WRONG_KEYS:
      return state.update('pressedWrongKeys', keys => keys.union(action.ids));

    case UNPRESS_WRONG_KEYS:
      return state.update('pressedWrongKeys', keys => keys.subtract(action.ids));

    case SET_START_TYPING_TIME:
      return state.set(['sessionStatistic', 'start'], action.time);

    case SET_IDS_CHAR_TO_TYPE:
      return state.set('idCharsToType', action.id);

    case ADD_HIT:
      return updateSessionStatisticPresses(state, 'hits', action.character);

    case ADD_TYPO:
      return updateSessionStatisticPresses(state, 'typos', action.character);

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

    case SET_LAST_NO_MODAL_LOCATION:
      return state.set('lastNoModalLocation', action.location);

    case SET_IS_MODAL:
      return state.set('isModal', action.modal);

    case SET_SESSION_ID:
      return state.set('sessionId', action.id);

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

export const addHit = character => ({
  type: ADD_HIT,
  character,
});

export const addTypo = character => ({
  type: ADD_TYPO,
  character,
});

export const zeroingStatic = () => ({
  type: ZEROING_STATISTIC,
});

export const setGlobalMessage = message => ({
  type: SET_GLOBAL_MESSAGE,
  message,
});

export const setLastNoModalLocation = location => ({
  type: SET_LAST_NO_MODAL_LOCATION,
  location,
});

export const setIsModal = modal => ({
  type: SET_IS_MODAL,
  modal,
});

export const processAction = (saveToClient, saveToServer) =>
  (dispatch, getState) => {
    let actions;

    if (getState().getIn(['user', 'email'])) {
      actions = saveToServer();
    }
    else {
      saveToClient();

      actions = Promise.resolve();
    }

    return actions;
  };

export const setSessionId = id => ({
  type: SET_SESSION_ID,
  id,
});

export const startNewSession = () => (dispatch, getState) => {
  const now = moment().startOf('day').toDate();
  const keyboard = getState().getIn(['main', 'keyboard']);
  const stateUser = getState().get('user');
  const mode = stateUser.get('mode');

  const date = stateUser
    .get('statistic')
    .find(obj => obj.get('date') === now);

  let statistic;

  if (date) {
    statistic = date.getIn([keyboard, mode]);
  }

  const index = statistic ? statistic.get('data').count() : 0;

  dispatch(setSessionId(index));
};

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
  }
};

export const init = () =>
  dispatch => {
    dispatch(initLessons());
  };

export const setAllWithoutAuth = data =>
  dispatch => {
    dispatch(setTextState(data.modes.text));

    const userData = data;
    delete userData.modes;

    dispatch(setUserState(userData));

    dispatch(init());
  };

export const setAllWithAuth = ({ tokens, ...rest }) =>
  dispatch => {
    dispatch(setTokens(tokens));

    dispatch(setAllWithoutAuth(rest));
  };

export const requestAllWithoutAuth = () =>
  dispatch =>
    dispatch(fetchJSON('/profile'))
      .then(data => dispatch(setAllWithoutAuth(data)));

