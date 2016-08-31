import * as types from '../constants/action_types';
import keyboards from '../constants/keyboards';
import {
  forEach,
  assign,
  clone,
  cloneDeep,
  map,
  random,
  times,
  find
} from 'lodash';

const INITIAL_STATE = {
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

  modal: '',

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

// slice char from chars array and return new chars array
const sliceChar = (chars, idChars) => {
  let newChars = chars.slice();

  forEach(idChars, id => {
    let index = newChars.indexOf(id);

    if (index + 1) {
      newChars = [
        ...newChars.slice(0, index),
        ...newChars.slice(index + 1)
      ]
    }

  });

  return newChars;
}

const getIdsFromChar = (keys, char) => {
  let charsToType = [];

  keys.forEach(obj => {

    // check if it upper case letter
    if (obj.shiftKey === char) {
      charsToType.push(obj.id);

      if (obj.hand === 'left') {
        charsToType.push('Right Shift');
      } else if (obj.hand === 'right') {
        charsToType.push('Left Shift');
      }

    } else if (obj.key === char) {
      charsToType.push(obj.id)
    }

  });

  return charsToType;
}

const pressKey = (state, char) => {
  let rightTypedChars = state.rightTypedChars;
  let errors = state.errors;
  let keys = find(state.keyboards, {'name': state.keyboardName}).keys
  let idChars = getIdsFromChar(keys, char)
  let pressedRightIds = sliceChar(state.pressedRightIds, idChars)
  let pressedWrongIds = sliceChar(state.pressedWrongIds, idChars)

  if (state.mode === 1) {
    let textEntities = cloneDeep(state.textEntities);
    let textId = state.currentTextId;
    let charToType = textEntities[textId].last[0];
    let idCharsToType = getIdsFromChar(keys, charToType);

    if (charToType === char) {

      pressedRightIds = pressedRightIds.concat(idChars);

      textEntities[textId].typed += char;

      textEntities[textId].last = textEntities[textId].last.substring(1);

      rightTypedChars += 1;

      idCharsToType = getIdsFromChar(keys, textEntities[textId].last[0]);

    } else {
      pressedWrongIds = pressedWrongIds.concat(idChars);

      errors += 1;
    }

    return assign({}, state, {
      pressedRightIds,
      pressedWrongIds,
      idCharsToType,
      textEntities,
      rightTypedChars,
      errors
    })

  } else if (state.mode === 2) {
    let learningLesson = clone(state.learningLesson);
    let charToType = state.learningLesson.last[0];
    let idCharsToType = getIdsFromChar(keys, charToType);

    if (charToType === char) {

      pressedRightIds = pressedRightIds.concat(idChars);

      learningLesson.typed += char;

      learningLesson.last = learningLesson.last.substring(1);

      rightTypedChars += 1;

      if (learningLesson.last.length === 0) {
        let keys = find(state.keyboards, {'name': state.keyboardName}).keys

        learningLesson = generateLesson(state.learningAlphabetSize, state.learningMaxWordLength, keys);
      }

      idCharsToType = getIdsFromChar(keys, learningLesson.last[0]);

    } else {
      pressedWrongIds = pressedWrongIds.concat(idChars);

      errors += 1;
    }

    return assign({}, state, {
      pressedRightIds,
      pressedWrongIds,
      idCharsToType,
      learningLesson,
      rightTypedChars,
      errors
    })

  }

  return state;
}

const generateLesson = (() => {
  let minWordLength = 3;
  let maxChars = 50;

  return (alphabetRange, maxWordLength, keys) => {
    let lesson = '';

    let charset = keys.reduce((charset, key) => {

      if (key.type === 'letter') {
        charset.push(key.id)
      }

      return charset

    }, []);

    let wordLength;

    while (lesson.length <= maxChars) {
      wordLength = random(minWordLength, maxWordLength);

      if (lesson.length + wordLength > maxChars) {
        wordLength = maxChars - lesson.length;

        if (wordLength < 3) {
          break;
        }
      }

      times(wordLength, function () {
        let idxLetter = random(0, alphabetRange - 1);

        lesson += charset[idxLetter];
      });

      lesson += ' ';

    }

    lesson = lesson.slice(0, -1)

    return {
      typed: '',
      last: lesson
    };

  }
})();

const actionMetronome = (state, action, value) => {
  let newState;
  let status;
  let volume;

  switch (action) {
    case 'play':
      status = 1;
      break
    case 'stop':
      status = 1;
      break
    case 'interval':
      volume = value;
      break
  }

  if (status !== undefined) {
    newState = {
      metronomeStatus: status
    };
  } else {
    newState = {
      metronomeInterval: volume
    };
  }

  return assign({}, state, newState);
};

let nextTextId = 10

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PRESS_KEY:
      return pressKey(state, action.char);

    case types.STOP_BEEN_PRESSED_KEY:
      return (() => {
        let keys = find(state.keyboards, {'name': state.keyboardName}).keys;

        let sliceCurrentChar = pressed => {
          return sliceChar(pressed, getIdsFromChar(keys, action.char))
        }

        return assign({}, state, {
          pressedRightIds: sliceCurrentChar(state.pressedRightIds),
          pressedWrongIds: sliceCurrentChar(state.pressedWrongIds)
        });
      })()

    case types.ADD_NEW_TEXT:
      nextTextId += 1;

      return assign({}, state, {
        textEntities: assign({}, state.textEntities, {
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

    case types.UPDATE_START_VARIABLES:
      return assign({}, state, {
        startTypingTime: Date.now(),
        rightTypedChars: 0,
        errors: 0,
      });

    case types.REFRESH_TEXT:
      let text = state.textEntities[action.textId];

      return assign({}, state, {
        textEntities: assign({}, state.textEntities, {
          [action.textId]: {
            title: text.title,
            typed: '',
            last: text.typed + text.last,
          }
        })
      });

    case types.SET_LESSON_ALPHABET_SIZE:
      return (() => {
        let keys = find(state.keyboards, {'name': state.keyboardName}).keys;

        return assign({}, state, {
          learningAlphabetSize: action.alphabetSize,
          learningLesson: generateLesson(action.alphabetSize, state.learningMaxWordLength, keys),
        });
      })()

    case types.SET_LESSON_MAX_WORD_LENGTH:
      return (() => {
        let keys = find(state.keyboards, {'name': state.keyboardName}).keys;

        return assign({}, state, {
          learningMaxWordLength: action.maxWordLength,
          learningLesson: generateLesson(state.learningAlphabetSize, action.maxWordLength, keys),
        })
      })()

    case types.SET_MODE:
      return assign({}, state, {
        mode: action.mode
      });

    case types.ACTION_METRONOME:
      return actionMetronome(state, action.action, action.value);

    case types.SET_KEYBOARD:
      return assign({}, state, {
        keyboardName: action.name
      });

    case types.OPEN_MODAL:
      return (() => {
        let closable = true;

        if (action.closable) {
          closable = action.closable;
        }

        return assign({}, state, {
          modal: action.name,
          closable
        });
      })()

    case types.CLOSE_MODAL:
      return assign({}, state, {
        modal: ''
      });

    default:
      return state;

  }
};



