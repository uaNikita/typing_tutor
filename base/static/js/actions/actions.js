import * as types from '../constants/action_types';

export function pressKey(char) {
  return {
    type: types.PRESS_KEY,
    char
  };
}

export function stopBeenPressedKey(char) {
  return {
    type: types.STOP_BEEN_PRESSED_KEY,
    char
  };
}

export function addNewText(title, text) {
  return {
    type: types.ADD_NEW_TEXT,
    title,
    text
  };
}

export function selectText(textId) {
  return {
    type: types.SELECT_TEXT,
    textId
  };
}

export function updateStartVariables() {
  return {
    type: types.UPDATE_START_VARIABLES
  };
}

export function refreshText(textId) {
  return {
    type: types.REFRESH_TEXT,
    textId
  };
}

export function setLessonAlphabetSize(alphabetSize) {
  return {
    type: types.SET_LESSON_ALPHABET_SIZE,
    alphabetSize
  };
}

export function setLessonMaxWordLength(maxWordLength) {
  return {
    type: types.SET_LESSON_MAX_WORD_LENGTH,
    maxWordLength
  };
}

export function setMode(mode) {
  return {
    type: types.SET_MODE,
    mode
  };
}

export function actionMetronome(action, value) {
  return {
    type: types.ACTION_METRONOME,
    action,
    value
  };
}

export function setKeyboard(name) {
  return {
    type: types.SET_KEYBOARD,
    name
  };
}