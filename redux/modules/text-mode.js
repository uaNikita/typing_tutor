import Immutable from 'immutable';
import moment from 'moment';

import { getIdsFromCharacter } from 'Utils';
import defaults from 'Utils/defaults';
import { fetchJSON } from './fetch';
import {
  processAction,
  setIdsCharToType,
  pressWrongKeys,
  addSuccesType,
  addErrorType,
} from './main';

const CLEAR_STATE = 'text-mode/CLEAR_STATE';
const SET_DATA = 'text-mode/SET_DATA';
const SELECT_TEXT = 'text-mode/SELECT_TEXT';
const SELECT_LAST_TEXT = 'text-mode/SELECT_LAST_TEXT';
const REFRESH_TEXT = 'text-mode/REFRESH_TEXT';
const ADD_TEXT = 'text-mode/ADD_TEXT';
const TYPE_ON_ENTITIE = 'text-mode/TYPE_ON_ENTITIE';
const SET_SESSION_ID = 'text-mode/SET_SESSION_ID';

const {
  text: {
    selectedId,
    entities,
  },
} = defaults;

const initialState = Immutable.fromJS({
  selectedId,

  entities,

  sessionId: undefined,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

    case SET_DATA:
      return state.merge(action.data);

    case ADD_TEXT:
      return state.update('entities', ents => ents.push(Immutable.Map({
        id: ents.last().get('id') + 1,
        typed: '',
        last: action.text,
      })));

    case SELECT_TEXT:
      return state.set('selectedId', action.id);

    case SELECT_LAST_TEXT:
      return state.set('selectedId', state.get('entities').last().get('id'));

    case REFRESH_TEXT:
      return state.update('entities', ents => ents.map(text => {
        let t = text;

        if (text.get('id') === action.id) {
          t = text.merge({
            typed: '',
            last: text.get('typed') + text.get('last'),
          });
        }

        return t;
      }));

    case TYPE_ON_ENTITIE:
      return state.update('entities', ents => ents.map(text => {
        let t = text;

        if (text.get('id') === action.id) {
          const last = text.get('last');

          t = text.merge({
            last: last.substring(1),
            typed: text.get('typed') + last[0],
          });
        }

        return t;
      }));

    case SET_SESSION_ID:
      return state.set('sessionId', action.id);

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

export const addText = text => ({
  type: ADD_TEXT,
  text,
});

export const selectText = id => ({
  type: SELECT_TEXT,
  id,
});

export const selectLastText = () => ({
  type: SELECT_LAST_TEXT,
});

export const refreshText = id => ({
  type: REFRESH_TEXT,
  id,
});

export const typeOnEntitie = id => ({
  type: TYPE_ON_ENTITIE,
  id,
});

export const setSessionId = id => ({
  type: SET_SESSION_ID,
  id,
});

export const startNewSession = () => (dispatch, getState) => {
  const now = moment().startOf('day').toDate();

  const statistic = getState()
    .getIn(['main', 'statistic'])
    .find(obj => obj.get('date') === now)
    .getIn(['modes', 'text']);

  const index = statistic ? statistic.get('data').count() : 0;

  dispatch(setSessionId(index));
};

export const processAddText = data => (dispatch, getState) => {
  const { text, select } = data;

  dispatch(addText(text));

  const id = getState().getIn(['textMode', 'entities']).last().get('id');

  if (select) {
    dispatch(selectText(id));
  }

  const body = {
    id,
    text,
    select,
  };

  return dispatch(processAction(() => dispatch(fetchJSON('/text/add', { body }))));
};

export const processSelectText = id => dispatch => {
  dispatch(selectText(parseInt(id, 10)));

  const body = { id };

  return dispatch(processAction(() => dispatch(fetchJSON('/text/select', { body }))));
};

export const processRefreshText = id => dispatch => {
  dispatch(refreshText(id));

  const body = { id };

  return dispatch(processAction(() => dispatch(fetchJSON('/text/refresh', { body }))));
};

export const updateCharToType = () => (dispatch, getState) => {
  const state = getState();
  const textId = state.getIn(['textMode', 'selectedId']);
  const text = state.getIn(['textMode', 'entities']).filter(obj => obj.get('id') === textId).get(0);

  let idsChar = '';

  if (text.get('last')) {
    idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), text.get('last')[0]);
  }

  dispatch(setIdsCharToType(idsChar));
};

export const typeTextMode = char => (dispatch, getState) => {
  const state = getState();
  const textId = state.getIn(['textMode', 'selectedId']);
  const idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']), char);

  const text = state
    .getIn(['textMode', 'entities'])
    .filter(obj => obj.get('id') === textId)
    .get(0);

  if (text.get('last')[0] === char) {
    dispatch(typeOnEntitie(textId));

    dispatch(addSuccesType());

    dispatch(updateCharToType());
  }
  else {
    dispatch(pressWrongKeys(idsChar));

    dispatch(addErrorType());
  }
};
