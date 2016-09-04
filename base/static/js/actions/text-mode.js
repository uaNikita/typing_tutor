import {find} from 'lodash';
import {getIdsFromChar, sliceChar} from "../utils";
import {
  setIdsCharToType,
  setPressedRightIds,
  setPressedWrongIds,
  addSuccesType,
  addErrorType,
  updateCharToType
} from "./main";

export const SELECT_TEXT = 'SELECT_TEXT';
export const REFRESH_TEXT = 'REFRESH_TEXT';
export const ADD_NEW_TEXT = 'ADD_NEW_TEXT';
export const TYPE_ON_ENTITIE = 'TYPE_ON_ENTITIE';

export function addNewText(title, text) {
  return {
    type: ADD_NEW_TEXT,
    title,
    text
  };
}

export function selectText(textId) {
  return {
    type: SELECT_TEXT,
    textId
  };
}

export function refreshText(textId) {
  return {
    type: REFRESH_TEXT,
    textId
  };
}

export function typeOnEntitie(textId) {
  return {
    type: TYPE_ON_ENTITIE,
    textId
  };
}

export function updateFromTextModeCharToType() {
  return (dispatch, getState) => {
    let state = getState();
    let keys = find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys;
    let textId = state.textMode.currentTextId;
    let entities = state.textMode.entities;

    let idsCharToType = getIdsFromChar(keys, entities[textId].last[0]);

    dispatch(setIdsCharToType(idsCharToType));
  }
}

export function typeTextMode(char) {
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