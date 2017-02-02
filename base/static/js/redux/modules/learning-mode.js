const TYPE_ON_LESSON = 'learning-mode/TYPE_ON_LESSON';

const SET_LEARNING_MODE = 'learning-mode/SET_LEARNING_MODE';
const SET_CURRENT_LESSON = 'learning-mode/SET_CURRENT_LESSON';
const REFRESH_CURRENT_LESSON = 'learning-mode/REFRESH_CURRENT_LESSON';
const SET_MAX_WORD_LENGTH = 'learning-mode/SET_MAX_WORD_LENGTH';

const SET_FINGERS_LESSON = 'learning-mode/SET_FINGERS_LESSON';
const SET_FINGERS_SET_SIZE = 'learning-mode/SET_FINGERS_SET_SIZE';

const SET_FREE_LESSON = 'learning-mode/SET_FREE_LESSON';
const SET_FREE_LETTERS = 'learning-mode/SET_FREE_LETTERS';
const ADD_LETTER_TO_FREE_LETTERS = 'learning-mode/ADD_LETTER_TO_FREE_LETTERS';
const REMOVE_LETTER_FROM_FREE_LETTERS = 'learning-mode/REMOVE_LETTER_FROM_FREE_LETTERS';

import {find, random, times, concat, filter, uniqWith, isEqual,
  assign, clone, cloneDeep, remove, pull} from 'lodash';

import {
  setIdsCharToType,
  setPressedRightIds,
  setPressedWrongIds,
  addSuccesType,
  addErrorType
} from "./main";

import {
  getIdsFromCharacter,
  sliceChar,
  generateLesson,
  getFingersSet
} from "../../utils";

const INITIAL_STATE = {
   // fingers, free,
   mode: 'fingers',

   maxWordLength: 5,

   fingersSetSize: 0,

   lessonFingers: '',

   lettersFree: [],

   lessonFree: '',

   lesson: {
      typed: '',
      last: ''
   }
};

export default (state = INITIAL_STATE, action = {}) => {
   switch (action.type) {

      case REFRESH_CURRENT_LESSON:
         return assign({}, state, {
            lesson: {
               typed: state.lesson.typed + state.lesson.last,
               last: ''
            }
         })

      case TYPE_ON_LESSON:
         return assign({}, state, {
            lesson: {
               typed: state.lesson.typed + state.lesson.last[0],
               last: state.lesson.last.substring(1)
            }
         })

      case SET_LEARNING_MODE:
         return assign({}, state, {
            mode: action.mode,
         });

      case SET_CURRENT_LESSON:
         return assign({}, state, {
            lesson: {
               typed: '',
               last: action.lesson
            }
         })

      case SET_MAX_WORD_LENGTH:
         return assign({}, state, {
            maxWordLength: action.length
         });

      case SET_FINGERS_SET_SIZE:
         return assign({}, state, {
            fingersSetSize: action.size
         });

      case SET_FINGERS_LESSON:
         return assign({}, state, {
            lessonFingers: action.lesson
         });

      case SET_FREE_LESSON:
         return assign({}, state, {
            lessonFree: action.lesson
         });

      case SET_FREE_LETTERS:
         return assign({}, state, {
            lettersFree: action.letters
         });

      case ADD_LETTER_TO_FREE_LETTERS:
         return assign({}, state, {
            lettersFree: [
               ...state.lettersFree,
               action.letter
            ]
         });

      case REMOVE_LETTER_FROM_FREE_LETTERS:
         return assign({}, state, {
            lettersFree: [
               ...pull(state.lettersFree, action.letter)
            ]
         });

      default:
         return state;

   }
};


export function setMode(mode) {
   return {
      type: SET_LEARNING_MODE,
      mode
   };
}

export function setCurrentLesson(lesson) {
   return {
      type: SET_CURRENT_LESSON,
      lesson
   };
}

export function refreshCurrentLesson() {
   return {
      type: REFRESH_CURRENT_LESSON
   };
}

export function setMaxWordLength(length) {
   return {
      type: SET_MAX_WORD_LENGTH,
      length
   };
}

export function setFingersLesson(lesson) {
   return {
      type: SET_FINGERS_LESSON,
      lesson
   };
}

export function setFingersSetSize(size) {
   return {
      type: SET_FINGERS_SET_SIZE,
      size
   };
}

export function setFreeLesson(lesson) {
   return {
      type: SET_FREE_LESSON,
      lesson
   };
}

export function setFreeLetters(letters) {
   return {
      type: SET_FREE_LETTERS,
      letters
   };
}

export function addLetterToFreeLetters(letter) {
   return {
      type: ADD_LETTER_TO_FREE_LETTERS,
      letter
   };
}

export function removeLetterFromFreeLetters(letter) {
   return {
      type: REMOVE_LETTER_FROM_FREE_LETTERS,
      letter
   };
}

export function typeOnLesson() {
   return {
      type: TYPE_ON_LESSON
   };
}

export function selectMode(mode) {
   return (dispatch, getState) => {

      dispatch(setMode(mode));

      let state = getState();
      let lesson = '';

      switch (mode) {
         case 'fingers':

            lesson = state.learningMode.lessonFingers;

            break;

         case 'free':

            lesson = state.learningMode.lessonFree;

            break;
      }

      dispatch(setCurrentLesson(lesson));

   }
}

export function generateAndSetFingersLesson() {
   return (dispatch, getState) => {

      let state = getState();

      let fingersSet = getFingersSet();

      fingersSet.splice(state.learningMode.fingersSetSize);

      fingersSet = concat.apply(null, fingersSet);

      let lesson = generateLesson(state.learningMode.maxWordLength, fingersSet);

      dispatch(setFingersLesson(lesson));

      dispatch(setCurrentLesson(lesson));
   }
}

export function generateAndSetFreeLesson() {
   return (dispatch, getState) => {

      let state = getState();

      let lesson = generateLesson(state.learningMode.maxWordLength, state.learningMode.lettersFree);

      dispatch(setFreeLesson(lesson));

      dispatch(setCurrentLesson(lesson));
   }
}

export function updateCharToType() {
   return (dispatch, getState) => {
      let state = getState();
      let keys = find(state.main.keyboards, {'name': state.main.keyboard}).keys;
      let idsCharToType = getIdsFromCharacter(keys, state.learningMode.lesson.last[0]);

      dispatch(setIdsCharToType(idsCharToType));
   }
}

export function typeLearningMode(char) {
   return (dispatch, getState) => {
      let state = getState();
      let keyboardState = state.main;
      var learningModeState = state.learningMode;
      let keys = find(keyboardState.keyboards, {'name': keyboardState.keyboard}).keys;
      let idsChar = getIdsFromCharacter(keys, char);

      if (learningModeState.lesson.last[0] === char) {
         let pressedRightIds = sliceChar(keyboardState.pressedRightIds, idsChar);

         dispatch(setPressedRightIds(pressedRightIds.concat(idsChar)));

         dispatch(typeOnLesson());

         // if (getState().learningMode.lesson.last.length === 0) {
         //    dispatch(generateLessonFromCurrentMode());
         // }

         dispatch(addSuccesType());

         dispatch(updateCharToType());

      } else {
         let pressedWrongIds = sliceChar(keyboardState.pressedWrongIds, idsChar)

         dispatch(setPressedWrongIds(pressedWrongIds.concat(idsChar)));

         dispatch(addErrorType());
      }
   }
}

export function initializeLearningState() {
   return (dispatch, getState) => {

      let state = getState();

      let keys = find(state.main.keyboards, {'name': state.main.keyboard}).keys;

      let defaultKeys = filter(keys, {
         row: 'middle',
         type: 'letter'
      });

      let resultForUnionWith = defaultKeys.map(obj=> {
         return {
            finger: obj.finger,
            hand: obj.hand
         };
      });

      let size = uniqWith(resultForUnionWith, isEqual).length;

      dispatch(setFingersSetSize(size));

      let letters = defaultKeys.map(obj=> {
         return obj.key;
      });

      let lesson = generateLesson(state.learningMode.maxWordLength, letters);

      dispatch(setFingersLesson(lesson));

      dispatch(setCurrentLesson(lesson));

      dispatch(setFreeLetters(letters));

      // different lesson for free mode
      lesson = generateLesson(state.learningMode.maxWordLength, letters);

      dispatch(setFreeLesson(lesson));

   }
}