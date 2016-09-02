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

export function openModal(name, closable) {
  return {
    type: types.OPEN_MODAL,
    name,
    closable
  };
}

export function closeModal() {
  return {
    type: types.CLOSE_MODAL
  };
}


export function setPressedRightIds(ids) {
  return {
    type: types.SET_PRESSED_RIGHT_IDS,
    ids
  };
}

export function setPressedWrongIds(ids) {
  return {
    type: types.SET_PRESSED_WRONG_IDS,
    ids
  };
}

export function setCharIdToType(id) {
  return {
    type: types.SET_CHAR_ID_TO_TYPE,
    id
  };
}

export function addSuccesType() {
  return {
    type: types.ADD_RIGHT_TYPED_CHARS
  };
}

export function addErrorType() {
  return {
    type: types.ADD_ERROR
  };
}

export function typeCharTextEntitie(textId) {
  return {
    type: types.TYPE_CHAR_TEXT_ENTITIE,
    textId
  };
}

function typeTextMode(char) {
  return {
    type: types.TYPE_TEXT_MODE,
    char
  };
}

function typeLearningMode(char) {
  return {
    type: types.TYPE_LEARNING_MODE,
    char
  };
}


export function typeChar(char) {
  return (dispatch, getState) => {
    dispatch(pressKey(char));

    setTimeout(() => {
      dispatch(stopBeenPressedKey(char));
    }, 100);

    switch (getState().keyboard.mode) {
      case 1:
        dispatch(typeTextMode(char))
        break
      case 2:
        dispatch(typeLearningMode(char))
        break
    }

  }
}