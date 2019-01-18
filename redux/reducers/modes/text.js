import Immutable from 'immutable';
import _ from 'lodash';
import dayjs from 'dayjs';

import {
  tempCookie,
  tempLocalStorage,
  getIdsFromCharacter,
  normalizeString,
} from 'Utils';

import { defaults, defaultsWhichCanBeOverwrittenByLS } from 'Constants/defaultState';
import { fetchJSON } from '../fetch';
import {
  processAction,
  setCharToType,
  pressWrongKeys,
  addTouch,
} from '../main';

import { processAddStatistic } from '../user';

const SET_STATE = 'text/SET_STATE';
const CLEAR_STATE = 'text/CLEAR_STATE';
const SELECT_TEXT = 'text/SELECT_TEXT';
const SELECT_LAST_TEXT = 'text/SELECT_LAST_TEXT';
const REFRESH_TEXT = 'text/REFRESH_TEXT';
const ADD_TEXT = 'text/ADD_TEXT';
const REMOVE_TEXT = 'text/REMOVE_TEXT';
const UPDATE_TEXT = 'text/UPDATE_TEXT';
const TYPE_ENTITIE = 'text/TYPE_ENTITIE';


export default (state = Immutable.fromJS(defaults.text), action = {}) => {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.data);

    case CLEAR_STATE:
      return state.merge(defaults.text, defaultsWhichCanBeOverwrittenByLS.text);

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

    case REMOVE_TEXT:
      return state.update('entities', ents => ents.filter(text => text.get('id') !== action.id));

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

export const removeText = id => ({
  type: REMOVE_TEXT,
  id,
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

    const entities = getState().getIn(['text', 'entities']);
    const id = entities.last().get('id');

    const body = { text, id };

    if (select) {
      dispatch(selectText(id));
    }

    return dispatch(processAction(
      () => tempLocalStorage.path('text', getState().get('text').toJS()),
      () => dispatch(fetchJSON('/text', { body })),
    ));
  }
);

export const processRemoveText = id => (
  (dispatch, getState) => {
    const textState = getState().get('text');

    dispatch(removeText(id));

    if (textState.get('selectedId') === id) {
      const firstId = textState.get('entities').first().get('id');

      dispatch(selectText(firstId));
    }

    return dispatch(processAction(
      () => tempLocalStorage.path('text', getState().get('text').toJS()),
      () => dispatch(fetchJSON(`/text/${id}`, {
        method: 'DELETE',
      })),
    ));
  }
);

export const processUpdateText = (id, { text, select }) => (
  (dispatch, getState) => {
    const normalizedText = normalizeString(text);

    dispatch(updateText(id, normalizedText));

    const body = {
      action: 'change-text',
      text: normalizedText,
    };

    if (select) {
      dispatch(selectText(id));

      body.select = select;
    }

    return dispatch(processAction(
      () => {
        if (body.select) {
          tempCookie.path('text.selectedId', id);
        }

        const entities = getState().getIn(['text', 'entities']);
        tempLocalStorage.path('text.entities', entities.toJS());
      },
      () => dispatch(fetchJSON(`/text/${id}`, {
        method: 'PATCH',
        body,
      })),
    ));
  });

export const processSelectText = id => (
  (dispatch) => {
    const selectedId = parseInt(id, 10);

    dispatch(selectText(selectedId));

    return dispatch(processAction(
      () => tempCookie.path('text.selectedId', selectedId),
      () => dispatch(fetchJSON(`/text/${id}`, {
        method: 'PATCH',
        body: {
          action: 'select',
        },
      })),
    ));
  });

export const processRefreshText = id => (
  (dispatch, getState) => {
    dispatch(refreshText(id));

    const entities = getState().getIn(['text', 'entities']);

    return dispatch(processAction(
      () => tempLocalStorage.path('text.entities', entities.toJS()),
      () => dispatch(fetchJSON(`/text/${id}`, {
        method: 'PATCH',
        body: {
          action: 'refresh',
        },
      })),
    ));
  }
);

export const updateCharToType = () => (dispatch, getState) => {
  const state = getState();
  const textId = state.getIn(['text', 'selectedId']);
  const text = state
    .getIn(['text', 'entities'])
    .filter(obj => obj.get('id') === textId)
    .get(0);

  const char = text.get('last') ? text.get('last')[0] : null;

  dispatch(setCharToType(char));
};

export const processTypeEntitiy = (() => {
  const deferredFetch = _.throttle(
    (dispatch, { id, typed }) => dispatch(fetchJSON(`/text/${id}`, {
      method: 'PATCH',
      body: {
        action: 'type',
        typed,
      },
    })),
    2000,
  );

  return id => (
    (dispatch, getState) => {
      dispatch(typeEntitie(id));

      const entities = getState().getIn(['text', 'entities']);
      const text = entities.filter(obj => obj.get('id') === id).get(0);

      return dispatch(processAction(
        () => tempLocalStorage.path('text.entities', entities.toJS()),
        () => deferredFetch(dispatch, {
          id,
          typed: text.get('typed').length,
        }),
      ));
    }
  );
})();

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

      dispatch(addTouch(true, char));
    }
    else {
      dispatch(pressWrongKeys(idsChar));

      dispatch(addTouch(false, char));
    }

    const sessionStart = state.getIn(['main', 'sessionStatistic', 'start']);

    if (dayjs(Date.now()).diff(sessionStart, 'second') > 10) {
      dispatch(processAddStatistic());
    }
  }
};
