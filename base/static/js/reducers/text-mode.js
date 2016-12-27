import * as types from '../constants/action-types/text-mode';

import {assign, cloneDeep} from 'lodash';

const INITIAL_STATE = {
  currentTextId: 2,

  entities: {
    1: {
      title: 'First',
      typed: 'Dolphins are a widely distributed and diverse group of fully aqua',
      last: 'tTtTtttTTTtic marine mammals. They are an informal grouping within the order Cetacea, excluding whales and porpoises, so to zoologists the grouping is paraphyletic. The dolphins comprise the extant families Delphinidae (the oceanic dolphins), Platanistidae (the Indian river dolphins), Iniidae (the new world river dolphins), and Pontoporiidae (the brackish dolphins). There are 40 extant species of dolphins. Dolphins, alongside other cetaceans, belong to the clade Cetartiodactyla with even-toed ungulates, and their closest living relatives are the hippopotamuses, having diverged about 40 million years ago. Dolphins range in size from the 1.7 metres (5.6 ft) long and 50 kilograms (110 lb) Maui\'s dolphin to the 9.5 metres (31 ft) and 10 metric tons (11 short tons) killer whale. Several species exhibit sexual dimorphism, in that the males are larger than females. They have streamlined bodies and two limbs that are modified into flippers. Though not quite as flexible as seals, some dolphins can travel at 55.5 kilometres per hour (34.5 mph). Dolphins use their conical shaped teeth to capture fast moving prey. They have well-developed hearing − their hearing, which is adapted for both air and water, is so well developed that some can survive even if they are blind. Some species are well adapted for diving to great depths. They have a layer of fat, or blubber, under the skin to keep warm in the cold water.'
    },
    2: {
      title: 'Second',
      typed: '',
      last: 'Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.'
    },
    3: {
      title: 'Long long long long long long long long long long long long long long long long long title',
      typed: 'Bears are mammals of the fa',
      last: 'mily Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.'
    },
    4: {
      title: 'Second',
      typed: 'Bears are mammals of the fa',
      last: 'mily Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.'
    },
    5: {
      title: 'Second',
      typed: 'Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.',
      last: ''
    }
  }
};

let nextTextId = 10

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_NEW_TEXT:
      nextTextId += 1;

      return assign({}, state, {
        entities: assign({}, state.entities, {
          [nextTextId - 1]: {
            title: action.title,
            typed: '',
            last: action.text
          }
        })
      });

    case types.SELECT_TEXT:
      return assign({}, state, {
        currentTextId: action.textId
      });

    case types.REFRESH_TEXT:
      let text = state.entities[action.textId];

      return assign({}, state, {
        entities: assign({}, state.entities, {
          [action.textId]: {
            title: text.title,
            typed: '',
            last: text.typed + text.last,
          }
        })
      });

    case types.TYPE_ON_ENTITIE:
      return (() => {
        let entities = cloneDeep(state.entities);

        let text = entities[action.textId];

        text.typed += text.last[0];
        text.last = text.last.substring(1);

        return assign({}, state, {
          entities
        });

      })()

    default:
      return state;

  }
};