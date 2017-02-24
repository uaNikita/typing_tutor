import Immutable from 'immutable';
import _ from 'lodash';
import uuidV4 from 'uuid/v4';

const SELECT_TEXT = 'text-mode/SELECT_TEXT';
const SELECT_LAST_TEXT = 'text-mode/SELECT_LAST_TEXT';
const REFRESH_TEXT = 'text-mode/REFRESH_TEXT';
const ADD_TEXT = 'text-mode/ADD_TEXT';
const TYPE_ON_ENTITIE = 'text-mode/TYPE_ON_ENTITIE';

import {getIdsFromCharacter, sliceChar} from "../../utils";
import {
   setIdsCharToType,
   pressWrongKeys,
   addSuccesType,
   addErrorType
} from "./main";

const initialState = Immutable.fromJS({

   currentTextId: 7,

   entities: [
      {
         id: 1,
         title: 'First',
         typed: 'Dolphins are a widely distributed and diverse group of fully aqua',
         last: 'tTtTtttTTTtic marine mammals. They are an informal grouping within the order Cetacea, excluding whales and porpoises, so to zoologists the grouping is paraphyletic. The dolphins comprise the extant families Delphinidae (the oceanic dolphins), Platanistidae (the Indian river dolphins), Iniidae (the new world river dolphins), and Pontoporiidae (the brackish dolphins). There are 40 extant species of dolphins. Dolphins, alongside other cetaceans, belong to the clade Cetartiodactyla with even-toed ungulates, and their closest living relatives are the hippopotamuses, having diverged about 40 million years ago. Dolphins range in size from the 1.7 metres (5.6 ft) long and 50 kilograms (110 lb) Maui\'s dolphin to the 9.5 metres (31 ft) and 10 metric tons (11 short tons) killer whale. Several species exhibit sexual dimorphism, in that the males are larger than females. They have streamlined bodies and two limbs that are modified into flippers. Though not quite as flexible as seals, some dolphins can travel at 55.5 kilometres per hour (34.5 mph). Dolphins use their conical shaped teeth to capture fast moving prey. They have well-developed hearing − their hearing, which is adapted for both air and water, is so well developed that some can survive even if they are blind. Some species are well adapted for diving to great depths. They have a layer of fat, or blubber, under the skin to keep warm in the cold water.'
      },
      {
         id: 2,
         title: 'Second',
         typed: '',
         last: 'Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.'
      },
      {
         id: 3,
         title: 'Long long long long long long long long long long long long long long long long long title',
         typed: 'Bears are mammals of the fa',
         last: 'mily Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.'
      },
      {
         id: 4,
         title: 'Second',
         typed: 'Bears are mammals of the fa',
         last: 'mily Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.'
      },
      {
         id: 5,
         title: 'Second',
         typed: 'Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.',
         last: ''
      },
      {
         id: 6,
         title: 'Second',
         typed: 'Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.',
         last: ''
      },
      {
         id: 7,
         title: 'Second',
         typed: 'Bears are mammals of the family Ursidae. Bears are classified as ',
         last: 'wIde var'
      },
      {
         id: 8,
         title: 'Second',
         typed: 'Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.',
         last: ''
      },
      {
         id: 9,
         title: 'Second',
         typed: 'Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.',
         last: ''
      }
   ]

});

export default (state = initialState, action = {}) => {
   switch (action.type) {
      case ADD_TEXT:
         return state.update('entities', entities => entities.push(Immutable.Map({
            id: uuidV4(),
            title: action.title,
            typed: '',
            last: action.text
         })));

      case SELECT_TEXT:
         return state.set('currentTextId', action.textId);

      case SELECT_LAST_TEXT:
         return state.set('currentTextId', state.get('entities').last().get('id'));

      case REFRESH_TEXT:

         return state.update('entities', entities => entities.map(text => {

            if (text.get('id') === action.textId) {

               text = text.merge({
                  typed: '',
                  last: text.get('typed') + text.get('last'),
               });

            }

            return text;

         }));

      case TYPE_ON_ENTITIE:

         return state.update('entities', entities => entities.map(text => {

            if (text.get('id') === action.textId) {

               let last = text.get('last');

               text = text.merge({
                  last: last.substring(1),
                  typed: text.get('typed') + last[0]
               });

            }

            return text;

         }));

      default:
         return state;

   }
};

export function addText(title, text) {
   return {
      type: ADD_TEXT,
      title,
      text
   };
}

export function selectText(textId) {
   return {
      type: SELECT_TEXT,
      textId
   };
}

export function selectLastText() {
   return {
      type: SELECT_LAST_TEXT
   };
}

export function refreshText(textId) {
   return {
      type: REFRESH_TEXT,
      textId
   };
}

export function typeOnEntitie(textId) {
   return {
      type: TYPE_ON_ENTITIE,
      textId
   };
}

export function updateCharToType() {
   return (dispatch, getState) => {

      let state = getState();
      let textId = state.getIn(['textMode', 'currentTextId']);
      let text = state.getIn(['textMode', 'entities']).filter(obj => obj.get('id') === textId).get(0);

      let idsChar = '';

      if (text.get('last')) {
         idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), text.get('last')[0]);
      }

      dispatch(setIdsCharToType(idsChar));

   };
}

export function typeTextMode(char) {
   return (dispatch, getState) => {
      let state = getState();
      let textId = state.getIn(['textMode', 'currentTextId']);
      let idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']), char);

      const text = state.getIn(['textMode', 'entities']).filter(obj => obj.get('id') === textId).get(0);

      if (text.get('last')[0] === char) {

         dispatch(typeOnEntitie(textId));

         dispatch(addSuccesType());

         dispatch(updateCharToType());

      } else {

         dispatch(pressWrongKeys(idsChar));

         dispatch(addErrorType());

      }
   };
};