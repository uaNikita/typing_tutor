import Immutable from 'immutable';
import moment from 'moment';
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
const ZEROING_STATISTIC = 'main/ZEROING_STATISTIC';
const SET_MODE = 'main/SET_MODE';
const ACTION_METRONOME = 'main/ACTION_METRONOME';
const SET_KEYBOARD = 'main/SET_KEYBOARD';
const PRESS_WRONG_KEYS = 'main/PRESS_WRONG_KEYS';
const UNPRESS_WRONG_KEYS = 'main/UNPRESS_WRONG_KEYS';
const SET_START_TYPING_TIME = 'main/SET_START_TYPING_TIME';
const SET_IDS_CHAR_TO_TYPE = 'main/SET_IDS_CHAR_TO_TYPE';
const ADD_SUCCESS_TYPE = 'main/ADD_SUCCESS_TYPE';
const ADD_ERROR_TYPE = 'main/ADD_ERROR_TYPE';
const SET_GLOBAL_MESSAGE = 'main/SET_GLOBAL_MESSAGE';
const SET_DATA = 'main/SET_DATA';
const SET_LAST_NO_MODAL_LOCATION = 'main/SET_LAST_NO_MODAL_LOCATION';
const SET_IS_MODAL = 'main/SET_IS_MODAL';
const SET_SESSION_ID = 'main/SET_SESSION_ID';
const ADD_STATISTIC = 'main/ADD_STATISTIC';

const initialState = Immutable.Map({
  keyboard: 'US',

  keys: Immutable.List(_.find(keyboards, { name: 'US' }).keys),

  pressedKeys: Immutable.Set([]),

  pressedWrongKeys: Immutable.Set([]),

  startTypingTime: 1461228933292,

  hits: 0,

  typos: 0,

  idCharsToType: '',

  metronomeStatus: 0,

  metronomeInterval: 800,

  // text, learning
  mode: 'text',

  globalMessage: false,

  lastNoModalLocation: undefined,

  iaModal: false,

  statistic: [],
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

    case SET_START_TYPING_TIME:
      return state.set('startTypingTime', action.time);

    case SET_IDS_CHAR_TO_TYPE:
      return state.set('idCharsToType', action.id);

    case ADD_SUCCESS_TYPE:
      return state.set('hits', state.get('hits') + 1);

    case ADD_ERROR_TYPE:
      return state.set('typos', state.get('typos') + 1);

    case ZEROING_STATISTIC:
      return state.merge({
        hits: 0,
        typos: 0,
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

    case SET_SESSION_ID:
      return state.set('sessionId', action.id);

    case ADD_STATISTIC:
      return state.update('statistic', dates => {
        const {
          keyboard,
          mode,
          sessionId,
          statistic,
        } = action;

        const now = moment().startOf('day').toDate();

        let newDates = dates;

        let dateIndex = newDates.findIndex(date => date.get('date') === now);

        if (dateIndex === -1) {
          newDates = dates.push(Immutable.fromJS({
            date: now,
          }));

          dateIndex = newDates.count() - 1;
        }

        return newDates.updateIn([dateIndex, keyboard, mode], mode => {
          let newMode = mode;

          if (!newMode) {
            newMode = Immutable.List([]);
          }

          newMode.set(sessionId, Immutable.Map(statistic))
        });
      });

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

export const addSuccesType = () => ({
  type: ADD_SUCCESS_TYPE,
});

export const addErrorType = () => ({
  type: ADD_ERROR_TYPE,
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

export const processAction = authActions => (dispatch, getState) => {
  let actions;

  if (getState().getIn(['user', 'email'])) {
    actions = authActions();
  }
  else {
    actions = Promise.resolve();

    const state = getState().toJS();

    delete state.fetch;
    delete state.form;
    delete state.main.hits;
    delete state.main.typos;

    window.localStorage.setItem('touchToType', JSON.stringify(state));
  }

  return actions;
};

export const setSessionId = id => ({
  type: SET_SESSION_ID,
  id,
});

export const startNewSession = () => (dispatch, getState) => {
  const now = moment().startOf('day').toDate();
  const stateMain = getState().get('main');
  const keyboard = stateMain.get('keyboard');
  const mode = stateMain.get('mode');

  const date = stateMain
    .get('statistic')
    .find(obj => obj.get('date') === now);

  let statistic;

  if (date) {
    statistic = date.getIn([keyboard, mode]);
  }

  const index = statistic ? statistic.get('data').count() : 0;

  dispatch(setSessionId(index));
};

export const addStatistic = obj => ({
  type: ADD_STATISTIC,
  ...obj,
});

export const processAddStatistic = () => (dispatch, getState) => {
  const stateMain = getState().get('main');

  const keyboard = stateMain.get('keyboard');
  const mode = stateMain.get('mode');
  const sessionId = stateMain.get('sessionId');

  const statistic = {
    hits: stateMain.get('hits'),
    typos: stateMain.get('typos'),
    start: stateMain.get('startTypingTime'),
    end: Date.now(),
  };

  const body = {
    keyboard,
    mode,
    sessionId,
    statistic,
  };

  dispatch(addStatistic(body));

  return dispatch(processAction(() => dispatch(fetchJSON('/profile/statistic', { body }))));
};

const addStatisticWithTimeout = _.throttle(
  dispatch => dispatch(processAddStatistic()),
  2000,
  { leading: false },
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

  switch (state.getIn(['main', 'mode'])) {
    case 'text':
      dispatch(typeTextMode(char));
      break;
    case 'learning':
      dispatch(typeLearningMode(char));
      break;
  }

  addStatisticWithTimeout(dispatch);
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
    dispatch(fetchJSON('/profile'))
      .then(data => dispatch(setAllWithoutAuth(data)));

