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
      id: 1,
      typed: 'Dolphins are a widely distributed and diverse group of fully aqua',
      last: 'tTtTtttTTTtic marine mammals. They are an informal grouping within the order Cetacea, excluding whales and porpoises, so to zoologists the grouping is paraphyletic. The dolphins comprise the extant families Delphinidae (the oceanic dolphins), Platanistidae (the Indian river dolphins), Iniidae (the new world river dolphins), and Pontoporiidae (the brackish dolphins). There are 40 extant species of dolphins. Dolphins, alongside other cetaceans, belong to the clade Cetartiodactyla with even-toed ungulates, and their closest living relatives are the hippopotamuses, having diverged about 40 million years ago. ',
    },
    {
      id: 2,
      typed: '',
      last: 'Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.',
    },
    {
      id: 3,
      typed: 'Bears are mammals of the fa',
      last: 'mily Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.',
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
        title: action.title,
        typed: '',
        last: action.text,
      })));

    case SELECT_TEXT:
      return state.set('currentTextId', action.textId);

    case SELECT_LAST_TEXT:
      return state.set('currentTextId', state.get('entities').last().get('id'));

    case REFRESH_TEXT:

      return state.update('entities', entities => entities.map(text => {
        let t = text;

        if (text.get('id') === action.textId) {
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

        if (text.get('id') === action.textId) {
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

export function addText(title, text) {
  return {
    type: ADD_TEXT,
    title,
    text,
  };
}

export function selectText(textId) {
  return {
    type: SELECT_TEXT,
    textId,
  };
}

export function selectLastText() {
  return {
    type: SELECT_LAST_TEXT,
  };
}

export function refreshText(textId) {
  return {
    type: REFRESH_TEXT,
    textId,
  };
}

export function typeOnEntitie(textId) {
  return {
    type: TYPE_ON_ENTITIE,
    textId,
  };
}

export function updateCharToType() {
  return (dispatch, getState) => {
    const state = getState();
    const textId = state.getIn(['textMode', 'currentTextId']);
    const text = state.getIn(['textMode', 'entities']).filter(obj => obj.get('id') === textId).get(0);

    let idsChar = '';

    if (text.get('last')) {
      idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), text.get('last')[0]);
    }

    dispatch(setIdsCharToType(idsChar));
  };
}

export function typeTextMode(char) {
  return (dispatch, getState) => {
    const state = getState();
    const textId = state.getIn(['textMode', 'currentTextId']);
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
