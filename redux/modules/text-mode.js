import Immutable from 'immutable';
import uuidV4 from 'uuid/v4';

import { getIdsFromCharacter } from '../../utils';
import {
  setIdsCharToType,
  pressWrongKeys,
  addSuccesType,
  addErrorType,
} from './main';

const CLEAR_STATE = 'text-mode/CLEAR_STATE';
const SELECT_TEXT = 'text-mode/SELECT_TEXT';
const SELECT_LAST_TEXT = 'text-mode/SELECT_LAST_TEXT';
const REFRESH_TEXT = 'text-mode/REFRESH_TEXT';
const ADD_TEXT = 'text-mode/ADD_TEXT';
const TYPE_ON_ENTITIE = 'text-mode/TYPE_ON_ENTITIE';

const initialState = Immutable.fromJS({
  selectedId: 2,

  entities: [
    {
      id: 0,
      typed: '',
      last: 'First text',
    },
  ],
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

    case ADD_TEXT:
      return state.update('entities', entities => entities.push(Immutable.Map({
        id: uuidV4(),
        typed: '',
        last: action.text,
      })));

    case SELECT_TEXT:
      return state.set('selectedId', action.id);

    case SELECT_LAST_TEXT:
      return state.set('selectedId', state.get('entities').last().get('id'));

    case REFRESH_TEXT:
      return state.update('entities', entities => entities.map(text => {
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
      return state.update('entities', entities => entities.map(text => {
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

export function typeTextMode(char) {
  return (dispatch, getState) => {
    const state = getState();
    const textId = state.getIn(['textMode', 'selectedId']);
    const idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']), char);

    const text = state.getIn(['textMode', 'entities']).filter(obj => obj.get('id') === textId).get(0);

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
}
