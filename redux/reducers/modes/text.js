import Immutable from 'immutable';
import _ from 'lodash';

import { getIdsFromCharacter, normalizeString } from 'Utils';
import temp from 'Utils/temp';
import defaults from 'Constants/defaultState';
import { fetchJSON } from '../fetch';
import {
  processAction,
  setIdsCharToType,
  pressWrongKeys,
  addTouch,
} from '../main';

import {
  addStatisticWithTimeout,
} from '../user';

const SET_STATE = 'text/SET_STATE';
const CLEAR_STATE = 'text/CLEAR_STATE';
const SELECT_TEXT = 'text/SELECT_TEXT';
const SELECT_LAST_TEXT = 'text/SELECT_LAST_TEXT';
const REFRESH_TEXT = 'text/REFRESH_TEXT';
const ADD_TEXT = 'text/ADD_TEXT';
const UPDATE_TEXT = 'text/UPDATE_TEXT';
const TYPE_ENTITIE = 'text/TYPE_ENTITIE';

const initialState = Immutable.fromJS(defaults.text);

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.data);

    case CLEAR_STATE:
      return state.merge(initialState);

    case ADD_TEXT:
      return state.update('entities', ents => ents.push(Immutable.Map({
        id: ents.last().get('id') + 1,
        typed: '',
        last: action.text,
      })));

    case UPDATE_TEXT:
      return state.update('entities', ents => ents.map((text) => {
        let t = text;

        if (text.get('id') === action.id) {
          t = text.merge({
            typed: '',
            last: action.text,
          });
        }

        return t;
      }));

    case SELECT_TEXT:
      return state.set('selectedId', action.id);

    case SELECT_LAST_TEXT:
      return state.set('selectedId', state.get('entities').last().get('id'));

    case REFRESH_TEXT:
      return state.update('entities', ents => ents.map((text) => {
        let t = text;

        if (text.get('id') === action.id) {
          t = text.merge({
            typed: '',
            last: text.get('typed') + text.get('last'),
          });
        }

        return t;
      }));

    case TYPE_ENTITIE:
      return state.update('entities', ents => ents.map((text) => {
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

export const updateText = (id, text) => ({
  type: UPDATE_TEXT,
  id,
  text,
});

export const selectText = id => ({
  type: SELECT_TEXT,
  id,
});

export const refreshText = id => ({
  type: REFRESH_TEXT,
  id,
});

export const typeEntitie = id => ({
  type: TYPE_ENTITIE,
  id,
});

export const processAddText = data => (
  (dispatch, getState) => {
    const { text, select } = data;

    dispatch(addText(text));

    const textState = getState().get('text');

    const id = textState.get('entities').last().get('id');

    if (select) {
      dispatch(selectText(id));
    }

    const body = {
      id,
      text,
      select,
    };

    return dispatch(processAction(
      () => temp.path('text', textState.toJS()),
      () => dispatch(fetchJSON('/text', { body })),
    ));
  }
);

export const processUpdateText = (id, { text, select }) => (
  (dispatch, getState) => {
    const normalizedText = normalizeString(text);

    dispatch(processAction(
      () => temp.path('text', getState().get('text').toJS()),
      () => dispatch(fetchJSON(`/text/${id}`, {
        method: 'PATCH',
        body: {
          text: normalizedText,
          select,
        },
      })),
    ))
      .then(() => {
        dispatch(updateText(id, normalizedText));

        if (select) {
          dispatch(selectText(id));
        }
      });
  });

export const processSelectText = id => (
  (dispatch) => {
    const selectedId = parseInt(id, 10);

    return dispatch(processAction(
      () => temp.path('text.selectedId', selectedId),
      () => dispatch(fetchJSON(`/text/${id}/select`)),
    ))
      .then(() => dispatch(selectText(selectedId)));
  });

export const processRefreshText = id => (
  (dispatch, getState) => {
    dispatch(refreshText(id));

    const body = { id };

    return dispatch(processAction(
      () => temp.path('text.entities', getState().getIn(['text', 'entities']).toJS()),
      () => dispatch(fetchJSON('/text/refresh', { body })),
    ));
  }
);

export const updateCharToType = () => (dispatch, getState) => {
  const state = getState();
  const textId = state.getIn(['text', 'selectedId']);
  const text = state.getIn(['text', 'entities']).filter(obj => obj.get('id') === textId).get(0);

  let idsChar = '';

  if (text.get('last')) {
    idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), text.get('last')[0]);
  }

  dispatch(setIdsCharToType(idsChar));
};

export const typeEntitiySaveToServer = _.throttle(
  (dispatch, ...rest) => dispatch(fetchJSON('/text/type', ...rest)),
  2000,
  { leading: false },
);

export const processTypeEntitiy = id => (
  (dispatch, getState) => {
    const textState = getState().get('text');

    dispatch(typeEntitie(id));

    const text = textState.get('entities')
      .filter(obj => obj.get('id') === id)
      .get(0);

    const body = {
      id,
      typed: text.get('typed').length,
    };

    return dispatch(processAction(
      () => temp.path('text', textState.toJS()),
      () => typeEntitiySaveToServer(dispatch, { body }),
    ));
  }
);

export const typeTextMode = char => (dispatch, getState) => {
  const state = getState();
  const textId = state.getIn(['text', 'selectedId']);
  const idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), char);

  const text = state
    .getIn(['text', 'entities'])
    .filter(obj => obj.get('id') === textId)
    .get(0);

  const charToType = text.get('last')[0];

  if (charToType) {
    if (charToType === char) {
      dispatch(processTypeEntitiy(textId));

      dispatch(addTouch('hit', char));
    }
    else {
      dispatch(pressWrongKeys(idsChar));

      dispatch(addTouch('typo', char));
    }

    addStatisticWithTimeout(dispatch);
  }
};
