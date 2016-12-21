import * as types from '../constants/action_types';
import {find, assign} from 'lodash';
import {updateFromTextModeCharToType, typeTextMode} from './text-mode';
import {updateFromLearningModeCharToType, typeLearningMode} from './learning-mode';
import {getIdsFromChar, sliceChar} from '../utils';

export function setMode(mode) {
  return {
    type: types.SET_MODE,
    mode
  };
}

export function pressKey(char) {
  return {
    type: types.PRESS_KEY,
    char
  };
}

export function updateStartVariables() {
  return {
    type: types.UPDATE_START_VARIABLES
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


export function stopBeenPressedKey(char) {
  return (dispatch, getState) => {
    let state = getState()
    let keys = find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys;

    let sliceCurrentChar = pressed => {
      return sliceChar(pressed, getIdsFromChar(keys, char))
    }

    dispatch(setPressedRightIds(sliceCurrentChar(state.keyboard.pressedRightIds)));
    dispatch(setPressedWrongIds(sliceCurrentChar(state.keyboard.pressedWrongIds)));
  }
}


export function updateCharToType() {
  return (dispatch, getState) => {
    switch (getState().keyboard.mode) {
      case 'text':
        dispatch(updateFromTextModeCharToType());
        break;
      case 'learning':
        dispatch(updateFromLearningModeCharToType());
        break;
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
        dispatch(typeTextMode(char))
        break
      case 'learning':
        dispatch(typeLearningMode(char))
        break
    }
  }
}