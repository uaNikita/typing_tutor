import {find} from 'lodash';
import {getIdsFromCharacter, sliceChar} from "../utils";
import {
  setIdsCharToType,
  setPressedRightIds,
  setPressedWrongIds,
  addSuccesType,
  addErrorType,
  updateCharToType
} from "./main";

import * as types from '../constants/action-types/text-mode';

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

export function refreshText(textId) {
  return {
    type: types.REFRESH_TEXT,
    textId
  };
}

export function typeOnEntitie(textId) {
  return {
    type: types.TYPE_ON_ENTITIE,
    textId
  };
}

export function updateFromTextModeCharToType() {
  return (dispatch, getState) => {
    let state = getState();
    let keys = find(state.main.keyboards, {'name': state.main.keyboard}).keys;
    let textId = state.textMode.currentTextId;
    let entities = state.textMode.entities;

    let idsCharToType = getIdsFromCharacter(keys, entities[textId].last[0]);

    dispatch(setIdsCharToType(idsCharToType));
  }
}

export function typeTextMode(char) {
  return (dispatch, getState) => {
    let state = getState();
    let keyboardState = state.keyboard;
    var textModeState = state.textMode;
    let keys = find(keyboardState.keyboards, {'name': keyboardState.keyboard}).keys
    let textId = textModeState.currentTextId;
    let idsChar = getIdsFromCharacter(keys, char);

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