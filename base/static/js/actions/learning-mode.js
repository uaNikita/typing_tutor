import {find, random, times, concat} from 'lodash';
import {
  setIdsCharToType,
  setPressedRightIds,
  setPressedWrongIds,
  addSuccesType,
  addErrorType,
  updateCharToType
} from "./main";
import {getIdsFromChar, sliceChar} from "../utils";

export const SET_LESSON_FINGERS_SET_SIZE = 'SET_LESSON_FINGERS_SET_SIZE';
export const SET_LESSON_MAX_WORD_LENGTH = 'SET_LESSON_MAX_WORD_LENGTH';
export const ADD_LETTER_TO_LESSON = 'ADD_LETTER_TO_LESSON';
export const REMOVE_LETTER_FROM_LESSON = 'REMOVE_LETTER_FROM_LESSON';
export const TYPE_ON_LESSON = 'TYPE_ON_LESSON';
export const SET_LESSON = 'SET_LESSON';
export const SET_LEARNING_MODE = 'SET_LEARNING_MODE';
export const SET_LETTERS_FINGERS_LEARNING_MODE = 'SET_LETTERS_FINGERS_LEARNING_MODE';
export const SET_LETTERS_FREE_LEARNING_MODE = 'SET_LETTERS_FREE_LEARNING_MODE';

const createLesson = (() => {
  let minWordLength = 3;
  let maxChars = 50;

  return (maxWordLength, letters) => {
    let lesson = '';
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
        let idxLetter = random(0, letters.length - 1);

        lesson += letters[idxLetter];
      });

      lesson += ' ';

    }

    lesson = lesson.slice(0, -1)

    return lesson;
  }
})();

export function setLessonFingersSetSize(size) {
  return {
    type: SET_LESSON_FINGERS_SET_SIZE,
    size
  };
}

export function setLessonMaxWordLength(length) {
  return {
    type: SET_LESSON_MAX_WORD_LENGTH,
    length
  };
}

export function addLetterToLesson(letter) {
  return {
    type: ADD_LETTER_TO_LESSON,
    letter
  };
}

export function removeLetterFromLesson(letter) {
  return {
    type: REMOVE_LETTER_FROM_LESSON,
    letter
  };
}

export function typeOnLesson() {
  return {
    type: TYPE_ON_LESSON
  };
}


export function setLesson(lesson) {
  return {
    type: SET_LESSON,
    lesson
  };
}

export function setLearningMode(mode) {
  return {
    type: SET_LEARNING_MODE,
    mode
  };
}

export function setLettersFingersLearningMode(letters) {
  return {
    type: SET_LETTERS_FINGERS_LEARNING_MODE,
    letters
  };
}

export function updateFromLearningModeCharToType() {
  return (dispatch, getState) => {
    let state = getState();
    let keys = find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys;
    let idsCharToType = getIdsFromChar(keys, state.learningMode.lesson.last[0]);

    dispatch(setIdsCharToType(idsCharToType));
  }
}

export function generateLessonFromFingersMode() {
  return (dispatch, getState) => {
    let state = getState();

    let keys = find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys;
    var fingers = ['index', 'middle', 'ring', 'pinky'];
    var rows = ['middle', 'top', 'bottom'];
    var hands = ['left', 'right'];

    let selectedLetters = [];

    rows.forEach(row=> {

      fingers.forEach(finger => {

        hands.forEach(hand => {

          var key = filter(keys, {
            row: row,
            finger: finger,
            hand: hand,
            type: 'letter'
          });

          key = key.map(obj=> {
            return obj.key;
          })

          if (key) {
            selectedLetters.push(key)
          }

        });

      });

    });

    selectedLetters.splice(state.learningMode.fingersSetSize);

    selectedLetters = concat.apply(null, selectedLetters);


    let lesson = createLesson(state.learningMode.maxWordLength, selectedLetters);

    dispatch(setLesson(lesson));
  }
}

export function generateLessonFromFreeMode() {
  return (dispatch, getState) => {
    let state = getState();

    let lesson = createLesson(state.learningMode.maxWordLength, state.learningMode.lettersFreeMode);

    dispatch(setLesson(lesson));
  }
}

export function generateLesson() {
  return (dispatch, getState) => {
    let state = getState();

    if (state.learningMode === 'letters set') {
      dispatch(generateLessonFromFingersMode());
    } else if (state.learningMode === 'keyboard') {
      dispatch(generateLessonFromFreeMode());
    }

    dispatch(updateFromLearningModeCharToType());
  }
}

export function typeLearningMode(char) {
  return (dispatch, getState) => {
    let state = getState();
    let keyboardState = state.keyboard;
    var learningModeState = state.learningMode;
    let keys = find(keyboardState.keyboards, {'name': keyboardState.keyboardName}).keys
    let idsChar = getIdsFromChar(keys, char);

    if (learningModeState.lesson.last[0] === char) {
      let pressedRightIds = sliceChar(keyboardState.pressedRightIds, idsChar);

      dispatch(setPressedRightIds(pressedRightIds.concat(idsChar)));

      dispatch(typeOnLesson());

      if (getState().learningMode.lesson.last.length === 0) {
        dispatch(generateLesson());
      }

      dispatch(addSuccesType());

      dispatch(updateCharToType());

    } else {
      let pressedWrongIds = sliceChar(keyboardState.pressedWrongIds, idsChar)

      dispatch(setPressedWrongIds(pressedWrongIds.concat(idsChar)));

      dispatch(addErrorType());
    }
  }
}