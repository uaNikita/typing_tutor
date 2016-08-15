import { combineReducers } from 'redux';
import keypad from './keypad';
import keyboards from '../constants/keyboards';

const initialState = {
  keyboardName: 'US',

  keyboards: keyboards,

  pressedRightIds: [],

  pressedWrongIds: [],

  currentTextId: 2,

  startTypingTime: 1461228933292,

  rightTypedChars: 0,

  errors: 0,

  idCharsToType:'f',

  metronomeStatus: 0,
  
  metronomeInterval: 800,

  // 1 - Text, 2 - Learning
  mode: 2,

  modal: 'Login',

  modalClosable: true,

  textEntities: {
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
  },

  learningAlphabetSize: 9,

  learningMaxWordLength: 5,

  learningLesson: {
    typed: 'fkad lfdaj aslh sgk ljgkl lgd lfjlf lgh hshf hl',
    last: 'da'
  }
};

export default function (state = initialState, action) {
  return keypad(state, action)
}
