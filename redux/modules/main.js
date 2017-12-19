import Immutable from 'immutable';
import _ from 'lodash';

import keyboards from '../../constants/keyboards';

import { fetchJSON, setAccessToken, setRefreshToken } from './fetch';
import { setData as setUserData } from './user';
import { setData as setTextData, typeTextMode } from './text-mode';
import { typeLearningMode, updateLearningState } from './learning-mode';

import { getIdsFromCharacter } from '../../utils';

const CLEAR_STATE = 'main/CLEAR_STATE';
const PRESS_KEYS = 'main/PRESS_KEYS';
const UNPRESS_KEYS = 'main/UNPRESS_KEYS';
const UPDATE_START_VARIABLES = 'main/UPDATE_START_VARIABLES';
const SET_MODE = 'main/SET_MODE';
const ACTION_METRONOME = 'main/ACTION_METRONOME';
const SET_KEYBOARD = 'main/SET_KEYBOARD';
const PRESS_WRONG_KEYS = 'main/PRESS_WRONG_KEYS';
const UNPRESS_WRONG_KEYS = 'main/UNPRESS_WRONG_KEYS';
const SET_IDS_CHAR_TO_TYPE = 'main/SET_IDS_CHAR_TO_TYPE';
const ADD_SUCCESS_TYPE = 'main/ADD_SUCCESS_TYPE';
const ADD_ERROR_TYPE = 'main/ADD_ERROR_TYPE';
const SET_GLOBAL_MESSAGE = 'main/SET_GLOBAL_MESSAGE';
const SET_DATA = 'main/SET_DATA';
const SET_LAST_NO_MODAL_LOCATION = 'main/SET_LAST_NO_MODAL_LOCATION';
const SET_IS_MODAL = 'main/SET_IS_MODAL';

const initialState = Immutable.Map({
  keyboard: 'US',

  keys: Immutable.List(_.find(keyboards, { name: 'US' }).keys),

  pressedKeys: Immutable.Set([]),

  pressedWrongKeys: Immutable.Set([]),

  startTypingTime: 1461228933292,

  successTypes: 0,

  errorTypes: 0,

  idCharsToType: '',

  metronomeStatus: 0,

  metronomeInterval: 800,

  // text, learning
  mode: 'text',

  globalMessage: false,

  lastNoModalLocation: undefined,

  iaModal: false,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

    case SET_DATA:
      return state.merge(action.data);

    case PRESS_KEYS:
      return state.update('pressedKeys', keys => keys.union(action.ids));

    case UNPRESS_KEYS:
      return state.update('pressedKeys', keys => keys.subtract(action.ids));

    case PRESS_WRONG_KEYS:
      return state.update('pressedWrongKeys', keys => keys.union(action.ids));

    case UNPRESS_WRONG_KEYS:
      return state.update('pressedWrongKeys', keys => keys.subtract(action.ids));

    case SET_IDS_CHAR_TO_TYPE:
      return state.set('idCharsToType', action.id);

    case ADD_SUCCESS_TYPE:
      return state.set('successTypes', state.get('successTypes') + 1);

    case ADD_ERROR_TYPE:
      return state.set('errorTypes', state.get('errorTypes') + 1);

    case UPDATE_START_VARIABLES:
      return state.merge({
        startTypingTime: Date.now(),
        successTypes: 0,
        errorTypes: 0,
      });

    case SET_MODE:
      return state.set('mode', action.mode);

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

    default:
      return state;
  }
};

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const setData = data => ({
  type: SET_DATA,
  data,
});

export const setMode = mode => ({
  type: SET_MODE,
  mode,
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

export const updateStartVariables = () => ({
  type: UPDATE_START_VARIABLES,
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

export const addSuccesType = () => ({
  type: ADD_SUCCESS_TYPE,
});

export const addErrorType = () => ({
  type: ADD_ERROR_TYPE,
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

export const processAction = (authActions, nonAuthActions) => (dispatch, getState) => {
  let actions;

  if (getState().getIn(['user', 'email'])) {
    actions = authActions();
  }
  else {
    actions = nonAuthActions();

    const state = getState().toJS();

    delete state.fetch;
    delete state.form;
    
    window.localStorage.setItem('touchToType', JSON.stringify(state));
  }

  return actions;
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

  switch (state.getIn(['main', 'mode'])) {
    case 'text':
      dispatch(typeTextMode(char));
      break;
    case 'learning':
      dispatch(typeLearningMode(char));
      break;
  }
};

export const init = () => dispatch => {
  dispatch(updateLearningState());
};

export const setAllWithoutAuth = data => dispatch => {
  dispatch(setUserData(data.profile));

  dispatch(setTextData(data.modes.text));

  dispatch(init());
};

export const setAllWithAuth = ({ tokens: { refresh, access }, ...rest }) => dispatch => {
  dispatch(setRefreshToken(refresh));

  dispatch(setAccessToken(access));

  dispatch(setAllWithoutAuth(rest));
};

export const requestAllWithoutAuth = () =>
  dispatch =>
    dispatch(fetchJSON('/user'))
      .then(data => dispatch(setAllWithoutAuth(data)));

