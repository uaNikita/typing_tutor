import {find, random, times, concat} from 'lodash';
import {
  setIdsCharToType,
  setPressedRightIds,
  setPressedWrongIds,
  addSuccesType,
  addErrorType,
  updateCharToType
} from "./main";
import {
  getIdsFromChar,
  sliceChar,
  createLesson,
  getLearningLettersSet
} from "../utils";


export const SET_LESSON_FINGERS_SET_SIZE = 'SET_LESSON_FINGERS_SET_SIZE';
export const SET_LESSON_MAX_WORD_LENGTH = 'SET_LESSON_MAX_WORD_LENGTH';
export const ADD_LETTER_TO_LESSON = 'ADD_LETTER_TO_LESSON';
export const REMOVE_LETTER_FROM_LESSON = 'REMOVE_LETTER_FROM_LESSON';
export const TYPE_ON_LESSON = 'TYPE_ON_LESSON';
export const SET_LESSON = 'SET_LESSON';
export const SET_LEARNING_MODE = 'SET_LEARNING_MODE';
export const SET_LETTERS_FREE_LEARNING_MODE = 'SET_LETTERS_FREE_LEARNING_MODE';


export function setLessonFingersSetSize(size) {
   return {
      type: SET_LESSON_FINGERS_SET_SIZE,
      size
   };
}

export function setLessonMaxWordLength(length) {
   return {
      type: SET_LESSON_MAX_WORD_LENGTH,
      length
   };
}

export function addLetterToLesson(letter) {
   return {
      type: ADD_LETTER_TO_LESSON,
      letter
   };
}

export function removeLetterFromLesson(letter) {
   return {
      type: REMOVE_LETTER_FROM_LESSON,
      letter
   };
}

export function typeOnLesson() {
   return {
      type: TYPE_ON_LESSON
   };
}


export function setLesson(lesson) {
   return {
      type: SET_LESSON,
      lesson
   };
}

export function setLearningMode(mode) {
   return {
      type: SET_LEARNING_MODE,
      mode
   };
}

export function updateFromLearningModeCharToType() {
   return (dispatch, getState) => {
      let state = getState();
      let keys = find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys;
      let idsCharToType = getIdsFromChar(keys, state.learningMode.lesson.last[0]);

      dispatch(setIdsCharToType(idsCharToType));
   }
}

export function generateLessonFromFingersMode() {
   return (dispatch, getState) => {
      let state = getState();

      let lettersSet = getLearningLettersSet();

      lettersSet.splice(state.learningMode.fingersSetSize);

      lettersSet = concat.apply(null, lettersSet);

      let lesson = createLesson(state.learningMode.maxWordLength, lettersSet);

      dispatch(setLesson(lesson));
   }
}

export function generateLessonFromFreeMode() {
   return (dispatch, getState) => {
      let state = getState();

      let lesson = createLesson(state.learningMode.maxWordLength, state.learningMode.lettersFreeMode);

      dispatch(setLesson(lesson));
   }
}

export function generateLessonFromCurrentMode() {
   return (dispatch, getState) => {
      let state = getState();

      if (state.learningMode.mode === 'fingers') {
         dispatch(generateLessonFromFingersMode());
      } else if (state.learningMode.mode === 'free') {
         dispatch(generateLessonFromFreeMode());
      }

      dispatch(updateFromLearningModeCharToType());
   }
}

export function typeLearningMode(char) {
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
            dispatch(generateLessonFromCurrentMode());
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