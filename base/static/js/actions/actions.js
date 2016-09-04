import * as types from '../constants/action_types';
import {find, forEach, random, times} from 'lodash';

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

export function setLessonAlphabetSize(size) {
  return {
    type: types.SET_LESSON_ALPHABET_SIZE,
    size
  };
}

export function setLessonMaxWordLength(length) {
  return {
    type: types.SET_LESSON_MAX_WORD_LENGTH,
    length
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

export function typeOnEntitie(textId) {
  return {
    type: types.TYPE_ON_ENTITIE,
    textId
  };
}

export function typeOnLesson() {
  return {
    type: types.TYPE_ON_LESSON
  };
}

export function setLesson(lesson) {
  return {
    type: types.SET_LESSON,
    lesson
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

    return lesson;

  }
})();

export function updateCharToType() {
  return (dispatch, getState) => {
    let state = getState();
    let keys = find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys
    let idsCharToType;

    switch (state.keyboard.mode) {
      // text mode
      case 'text':
        let textId = state.textMode.currentTextId;
        let entities = state.textMode.entities;

        idsCharToType = getIdsFromChar(keys, entities[textId].last[0]);

        dispatch(setIdsCharToType(idsCharToType));

        break;
      case 'learning':
        idsCharToType = getIdsFromChar(keys, state.learningMode.lesson.last[0]);

        dispatch(setIdsCharToType(idsCharToType));

        break;
    }
  }
}

export function updateLesson() {
  return (dispatch, getState) => {
    let state = getState();
    let keys = find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys
    let lesson = generateLesson(state.learningMode.alphabetSize, state.learningMode.maxWordLength, keys);

    dispatch(setLesson(lesson));
  }
}

export function updateLessonAlphabetSize(size) {
  return (dispatch, getState) => {
    dispatch(setLessonAlphabetSize(size));

    dispatch(updateLesson());
  }
}

export function updateLessonMaxWordLength(length) {
  return (dispatch, getState) => {
    dispatch(setLessonMaxWordLength(length));

    dispatch(updateLesson());
  }
}

function textTypeMode(char) {
  return (dispatch, getState) => {
    let state = getState();
    let keyboardState = state.keyboard;
    var textModeState = state.textMode;
    let keys = find(keyboardState.keyboards, {'name': keyboardState.keyboardName}).keys
    let textId = textModeState.currentTextId;
    let idsChar = getIdsFromChar(keys, char);

    if (textModeState.entities[textId].last[0] === char) {
      let pressedRightIds = sliceChar(keyboardState.pressedRightIds, idsChar);

      dispatch(setPressedRightIds(pressedRightIds.concat(idsChar)));

      dispatch(typeOnEntitie(textId));

      dispatch(addSuccesType());

      dispatch(updateCharToType());
    } else {
      let pressedWrongIds = sliceChar(keyboardState.pressedWrongIds, idsChar)

      dispatch(setPressedWrongIds(pressedWrongIds.concat(idsChar)));

      dispatch(addErrorType());
    }
  }
}

function typeLearningMode(char) {
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

export function typeChar(char) {
  return (dispatch, getState) => {
    dispatch(pressKey(char));

    setTimeout(() => {
      dispatch(stopBeenPressedKey(char));
    }, 100);

    switch (getState().keyboard.mode) {
      case 'text':
        dispatch(textTypeMode(char))
        break
      case 'learning':
        dispatch(typeLearningMode(char))
        break
    }
  }
}