import {find, random, times} from 'lodash';
import {
  setIdsCharToType,
  setPressedRightIds,
  setPressedWrongIds,
  addSuccesType,
  addErrorType,
  updateCharToType
} from "./main";
import { getIdsFromChar, sliceChar } from "../utils";

export const SET_LESSON_ALPHABET_SIZE = 'SET_LESSON_ALPHABET_SIZE';
export const SET_LESSON_MAX_WORD_LENGTH = 'SET_LESSON_MAX_WORD_LENGTH';
export const ADD_LETTER_TO_LESSON = 'ADD_LETTER_TO_LESSON';
export const REMOVE_LETTER_FROM_LESSON = 'REMOVE_LETTER_FROM_LESSON';
export const TYPE_ON_LESSON = 'TYPE_ON_LESSON';
export const SET_LESSON = 'SET_LESSON';
export const SET_LEARNING_MODE = 'SET_LEARNING_MODE';

const generateLesson = (() => {
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

export function setLessonAlphabetSize(size) {
  return {
    type: SET_LESSON_ALPHABET_SIZE,
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

export function updateFromLearningModeCharToType() {
  return (dispatch, getState) => {
    let state = getState();
    let keys = find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys;
    let idsCharToType = getIdsFromChar(keys, state.learningMode.lesson.last[0]);

    dispatch(setIdsCharToType(idsCharToType));
  }
}

export function updateLesson() {
  return (dispatch, getState) => {
    let state = getState();

    let lesson = generateLesson(state.learningMode.maxWordLength, state.learningMode.letters);

    dispatch(setLesson(lesson));

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
        dispatch(updateLesson());
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