import Immutable from 'immutable';

import { getIdsFromCharacter, ls } from 'Utils';
import defaults from 'Utils/defaults';
import { fetchJSON } from '../fetch';
import {
  processAction,
  setIdsCharToType,
  pressWrongKeys,
  addHit,
  addTypo,
  addStatisticWithTimeout,
} from '../main';

const CLEAR_STATE = 'text/CLEAR_STATE';
const SET_STATE = 'text/SET_STATE';
const SELECT_TEXT = 'text/SELECT_TEXT';
const SELECT_LAST_TEXT = 'text/SELECT_LAST_TEXT';
const REFRESH_TEXT = 'text/REFRESH_TEXT';
const ADD_TEXT = 'text/ADD_TEXT';
const TYPE_ON_ENTITIE = 'text/TYPE_ON_ENTITIE';

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
    case SET_STATE:
      return state.set(action.data);

    case CLEAR_STATE:
      return state.set(initialState);

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

    default:
      return state;
  }
};

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const setState = data => ({
  type: SET_STATE,
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

export const processAddText = data =>
  (dispatch, getState) => {
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

    return dispatch(processAction(
      () => ls.set('modes.text', getState()),
      () => dispatch(fetchJSON('/text/add', { body })),
    ));
  };

export const processSelectText = id =>
  (dispatch, getState) => {
    dispatch(selectText(parseInt(id, 10)));

    const body = { id };

    return dispatch(processAction(
      () => ls.set('modes.text', getState()),
      () => dispatch(fetchJSON('/text/select', { body })),
    ));
  };

export const processRefreshText = id =>
  (dispatch, getState) => {
    dispatch(refreshText(id));

    const body = { id };

    return dispatch(processAction(
      () => ls.set('modes.text', getState()),
      () => dispatch(fetchJSON('/text/refresh', { body })),
    ));
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
  const idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), char);

  const text = state
    .getIn(['textMode', 'entities'])
    .filter(obj => obj.get('id') === textId)
    .get(0);

  const charToType = text.get('last')[0];

  if (charToType) {
    if (charToType === char) {
      dispatch(typeOnEntitie(textId));

      dispatch(addHit(char));

      dispatch(updateCharToType());
    }
    else {
      dispatch(pressWrongKeys(idsChar));

      dispatch(addTypo(char));
    }

    addStatisticWithTimeout(dispatch);
  }
};
