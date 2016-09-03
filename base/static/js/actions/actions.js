import * as types from '../constants/action_types';
import {find, forEach} from 'lodash';

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

export function setIdsCharToType(id) {
  return {
    type: types.SET_IDS_CHAR_TO_TYPE,
    id
  };
}

export function addSuccesType() {
  return {
    type: types.ADD_SUCCESS_TYPE
  };
}

export function addErrorType() {
  return {
    type: types.ADD_ERROR_TYPE
  };
}

export function typeCharTextEntitie(textId) {
  return {
    type: types.TYPE_CHAR_TEXT_ENTITIE,
    textId
  };
}


export function typeOnEntitie(textId) {
  return {
    type: types.TYPE_ON_ENTITIE,
    textId
  };
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

function textTypeMode(char, dispatch, getState) {
  let state = getState();
  let keyboardState = getState().keyboard;
  let keys = find(state.keyboard.keyboards, {'name': keyboardState.keyboardName}).keys
  var textModeState = state.textMode;
  let textId = textModeState.currentTextId;
  let idsChar = getIdsFromChar(keys, char);

  if (textModeState.entities[textId].last[0] === char) {
    let pressedRightIds = sliceChar(keyboardState.pressedRightIds, idsChar);
    
    dispatch(setPressedRightIds(pressedRightIds.concat(idsChar)));

    dispatch(typeOnEntitie(textId));

    dispatch(addSuccesType());

    // get char from new state
    let idsCharToType = getIdsFromChar(keys, getState().textMode.entities[textId].last[0]);

    dispatch(setIdsCharToType(idsCharToType));

  } else {
    let pressedWrongIds = sliceChar(keyboardState.pressedWrongIds, idsChar)

    dispatch(setPressedWrongIds(pressedWrongIds.concat(idsChar)));

    dispatch(addErrorType());
  }
}

function typeLearningMode(char, dispatch, getState) {

}

export function typeChar(char) {
  return (dispatch, getState) => {
    dispatch(pressKey(char));

    setTimeout(() => {
      dispatch(stopBeenPressedKey(char));
    }, 100);

    switch (getState().keyboard.mode) {
      // text mode
      case 'text':
        textTypeMode(char, dispatch, getState)
        break
      case 'learing':
        dispatch(typeLearningMode(char))
        break
    }

  }
}