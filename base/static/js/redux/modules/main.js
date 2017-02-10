const PRESS_KEY = 'main/PRESS_KEY';

const UPDATE_START_VARIABLES = 'main/UPDATE_START_VARIABLES';
const SET_MODE = 'main/SET_MODE';
const ACTION_METRONOME = 'main/ACTION_METRONOME';
const SET_KEYBOARD = 'main/SET_KEYBOARD';

const SET_PRESSED_RIGHT_IDS = 'main/SET_PRESSED_RIGHT_IDS';
const SET_PRESSED_WRONG_IDS = 'main/SET_PRESSED_WRONG_IDS';
const SET_IDS_CHAR_TO_TYPE = 'main/SET_IDS_CHAR_TO_TYPE';
const ADD_SUCCESS_TYPE = 'main/ADD_SUCCESS_TYPE';
const ADD_ERROR_TYPE = 'main/ADD_ERROR_TYPE';

import keyboards from '../../constants/keyboards';
import _ from 'lodash';

import {updateFromTextModeCharToType, typeTextMode} from './text-mode';
import {updateCharToType as updateFromLearningModeCharToType, typeLearningMode} from './learning-mode';
import {getIdsFromCharacter, sliceChar} from '../../utils';


const INITIAL_STATE = {
   keyboard: 'US',

   keys: _.find(keyboards, {'name': 'US'}).keys,

   pressedRightIds: [],

   pressedWrongIds: [],

   startTypingTime: 1461228933292,

   successTypes: 0,

   errorTypes: 0,

   idCharsToType: '',

   metronomeStatus: 0,

   metronomeInterval: 800,

   // text, learning
   mode: 'text',
};

export default (state = INITIAL_STATE, action = {}) => {
   switch (action.type) {
      case SET_PRESSED_RIGHT_IDS:
         return {
            ...state,
            pressedRightIds: action.ids
         }

      case SET_PRESSED_WRONG_IDS:
         return {
            ...state,
            pressedWrongIds: action.ids
         }

      case SET_IDS_CHAR_TO_TYPE:
         return {
            ...state,
            idCharsToType: action.id
         }

      case ADD_SUCCESS_TYPE:
         return {
            ...state,
            successTypes: state.successTypes + 1
         }

      case ADD_ERROR_TYPE:
         return {
            ...state,
            errorTypes: state.errorTypes + 1
         }

      case UPDATE_START_VARIABLES:
         return {
            ...state,
            startTypingTime: Date.now(),
            successTypes: 0,
            errorTypes: 0,
         }

      case SET_MODE:
         return {
            ...state,
            mode: action.mode
         }

      case ACTION_METRONOME:
         return {
            ...state
         }

      case SET_KEYBOARD:
         return {
            ...state,
            keyboard: action.name,
            keys: _.find(keyboards, {'name': action.name}).keys
         }

      default:
         return state;

   }
};

export function setMode(mode) {
   return {
      type: SET_MODE,
      mode
   };
}

export function pressKey(char) {
   return {
      type: PRESS_KEY,
      char
   };
}

export function updateStartVariables() {
   return {
      type: UPDATE_START_VARIABLES
   };
}

export function actionMetronome(action, value) {
   return {
      type: ACTION_METRONOME,
      action,
      value
   };
}

export function setKeyboard(name) {
   return {
      type: SET_KEYBOARD,
      name
   };
}

export function openModal(name, closable) {
   return {
      type: OPEN_MODAL,
      name,
      closable
   };
}

export function closeModal() {
   return {
      type: CLOSE_MODAL
   };
}


export function setPressedRightIds(ids) {
   return {
      type: SET_PRESSED_RIGHT_IDS,
      ids
   };
}

export function setPressedWrongIds(ids) {
   return {
      type: SET_PRESSED_WRONG_IDS,
      ids
   };
}

export function setIdsCharToType(id) {
   return {
      type: SET_IDS_CHAR_TO_TYPE,
      id
   };
}

export function addSuccesType() {
   return {
      type: ADD_SUCCESS_TYPE
   };
}

export function addErrorType() {
   return {
      type: ADD_ERROR_TYPE
   };
}

export function stopBeenPressedKey(char) {
   return (dispatch, getState) => {
      let state = getState()
      let keys = state.main.keys;

      let sliceCurrentChar = pressed => {
         return sliceChar(pressed, getIdsFromCharacter(keys, char))
      }

      dispatch(setPressedRightIds(sliceCurrentChar(state.main.pressedRightIds)));
      dispatch(setPressedWrongIds(sliceCurrentChar(state.main.pressedWrongIds)));
   }
}

export function updateCharToType() {
   return (dispatch, getState) => {
      switch (getState().main.mode) {
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

      switch (getState().main.mode) {
         case 'text':
            dispatch(typeTextMode(char))
            break
         case 'learning':
            dispatch(typeLearningMode(char))
            break
      }
   }
}
