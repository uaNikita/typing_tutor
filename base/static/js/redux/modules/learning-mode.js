const TYPE_ON_LESSON = 'learning-mode/TYPE_ON_LESSON';

const SET_LEARNING_MODE = 'learning-mode/SET_LEARNING_MODE';
const SET_CURRENT_LESSON = 'learning-mode/SET_CURRENT_LESSON';
const REFRESH_CURRENT_LESSON = 'learning-mode/REFRESH_CURRENT_LESSON';

const SET_LESSON_FINGERS = 'learning-mode/SET_LESSON_FINGERS';
const SET_SET_SIZE_FINGERS = 'learning-mode/SET_SET_SIZE_FINGERS';
const SET_MAX_LETTERS_IN_WORD_FINGERS = 'learning-mode/SET_MAX_LETTERS_IN_WORD_FINGERS';

const SET_LESSON_FREE = 'learning-mode/SET_LESSON_FREE';
const SET_LETTERS_FREE = 'learning-mode/SET_LETTERS_FREE';
const SET_MAX_LETTERS_IN_WORD_FREE = 'learning-mode/SET_MAX_LETTERS_IN_WORD_FREE';
const ADD_LETTER_TO_FREE_LETTERS = 'learning-mode/ADD_LETTER_TO_FREE_LETTERS';
const REMOVE_LETTER_FROM_FREE_LETTERS = 'learning-mode/REMOVE_LETTER_FROM_FREE_LETTERS';

import _ from 'lodash';

import {
   setIdsCharToType,
   pressWrongKeys,
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

   maxLettersInWordFingers: 5,

   setSizeFingers: 0,

   lessonFingers: '',

   maxLettersInWordFree: 5,

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
         return {
            ...state,
            lesson: {
               typed: '',
               last: state.lesson.typed + state.lesson.last
            }
         }

      case TYPE_ON_LESSON:
         return {
            ...state,
            lesson: {
               typed: state.lesson.typed + state.lesson.last[0],
               last: state.lesson.last.substring(1)
            }
         }

      case SET_LEARNING_MODE:
         return {
            ...state,
            mode: action.mode
         };

      case SET_CURRENT_LESSON:
         return {
            ...state,
            lesson: {
               typed: '',
               last: action.lesson
            }
         };

      case SET_MAX_LETTERS_IN_WORD_FINGERS:
         return {
            ...state,
            maxLettersInWordFingers: action.length
         }

      case SET_MAX_LETTERS_IN_WORD_FREE:
         return {
            ...state,
            maxLettersInWordFree: action.length
         }

      case SET_SET_SIZE_FINGERS:
         return {
            ...state,
            setSizeFingers: action.size
         }

      case SET_LESSON_FINGERS:
         return {
            ...state,
            lessonFingers: action.lesson
         }

      case SET_LESSON_FREE:
         return {
            ...state,
            lessonFree: action.lesson
         }

      case SET_LETTERS_FREE:
         return {
            ...state,
            lettersFree: action.letters
         }

      case ADD_LETTER_TO_FREE_LETTERS:
         return {
            ...state,
            lettersFree: [
               ...state.lettersFree,
               action.letter
            ]
         }

      case REMOVE_LETTER_FROM_FREE_LETTERS:
         return {
            ...state,
            lettersFree: [
               ..._.pull(state.lettersFree, action.letter)
            ]
         }

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

export function setMaxLettersInWordFingers(length) {
   return {
      type: SET_MAX_LETTERS_IN_WORD_FINGERS,
      length
   };
}

export function setMaxLettersInWordFree(length) {
   return {
      type: SET_MAX_LETTERS_IN_WORD_FREE,
      length
   };
}

export function setLessonFingers(lesson) {
   return {
      type: SET_LESSON_FINGERS,
      lesson
   };
}

export function setSetSizeFingers(size) {
   return {
      type: SET_SET_SIZE_FINGERS,
      size
   };
}

export function setLessonFree(lesson) {
   return {
      type: SET_LESSON_FREE,
      lesson
   };
}

export function setLettersFree(letters) {
   return {
      type: SET_LETTERS_FREE,
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

   };
}

export function generateAndSetFingersLesson() {
   return (dispatch, getState) => {

      let state = getState();

      let keys = state.main.keys;

      let fingersSet = getFingersSet(keys);

      fingersSet.splice(state.learningMode.setSizeFingers);

      fingersSet = _.concat.apply(null, fingersSet);

      let lesson = generateLesson(state.learningMode.maxLettersInWordFingers, fingersSet);

      dispatch(setLessonFingers(lesson));

      dispatch(setCurrentLesson(lesson));
   };
}

export function generateAndSetFreeLesson() {
   return (dispatch, getState) => {

      let state = getState();

      let lesson = generateLesson(state.learningMode.maxLettersInWordFree, state.learningMode.lettersFree);

      dispatch(setLessonFree(lesson));

      dispatch(setCurrentLesson(lesson));
   };
}

export function updateCharToType() {
   return (dispatch, getState) => {

      let state = getState();

      let idsChar = '';

      if (state.learningMode.lesson.last) {

         idsChar = getIdsFromCharacter(state.main.keys, state.learningMode.lesson.last[0]);
      }
      
      dispatch(setIdsCharToType(idsChar));

   };
}

export function typeLearningMode(char) {
   return (dispatch, getState) => {

      let state = getState();

      if (state.learningMode.lesson.last) {

         let idsChar = getIdsFromCharacter(state.main.keys, char);

         if (state.learningMode.lesson.last[0] === char) {

            dispatch(typeOnLesson());

            dispatch(addSuccesType());

            dispatch(updateCharToType());

         } else {

            let pressedWrongKeys = sliceChar(state.main.pressedWrongKeys, idsChar);

            dispatch(pressWrongKeys(pressedWrongKeys.concat(idsChar)));

            dispatch(addErrorType());

         }

      } else {

         dispatch(generateLessonFromCurrentMode());

      }

   };
}

export function initializeLearningState() {
   return (dispatch, getState) => {

      const state = getState();
      
      let defaultKeys = _.filter(state.main.keys, {
         row: 'middle',
         type: 'letter'
      });


      console.log('defaultKeys', defaultKeys);

      let size = _(defaultKeys)
        .map(o => {
           return {
              finger: o.finger,
              hand: o.hand
           };
        })
        .uniqWith(_.isEqual)
        .value()
        .length;

      dispatch(setSetSizeFingers(size));

      let letters = defaultKeys.map(obj => {
         return obj.key;
      });

      let lesson = generateLesson(state.learningMode.maxLettersInWordFingers, letters);

      dispatch(setLessonFingers(lesson));

      dispatch(setCurrentLesson(lesson));

      dispatch(setLettersFree(letters));

      // different lesson for free mode
      lesson = generateLesson(state.learningMode.maxLettersInWordFree, letters);

      dispatch(setLessonFree(lesson));

      dispatch(updateCharToType());
   };
}