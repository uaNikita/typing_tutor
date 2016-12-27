import {find, random, times, concat, filter} from 'lodash';

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
} from "../utils";

import * as types from '../constants/action-types/learning-mode';

export function setMode(mode) {
   return {
      type: types.SET_LEARNING_MODE,
      mode
   };
}

export function setCurrentLesson(lesson) {
   return {
      type: types.SET_CURRENT_LESSON,
      lesson
   };
}

export function refreshCurrentLesson() {
   return {
      type: types.REFRESH_CURRENT_LESSON
   };
}

export function setMaxWordLength(length) {
   return {
      type: types.SET_MAX_WORD_LENGTH,
      length
   };
}

export function setFingersLesson(lesson) {
   return {
      type: types.SET_FINGERS_LESSON,
      lesson
   };
}

export function setFingersSetSize(size) {
   return {
      type: types.SET_FINGERS_SET_SIZE,
      size
   };
}

export function setFreeLesson(lesson) {
   return {
      type: types.SET_FREE_LESSON,
      lesson
   };
}

export function setFreeLetters(letters) {
   return {
      type: types.SET_FREE_LETTERS,
      letters
   };
}

export function addLetterToFreeLetters(letter) {
   return {
      type: types.ADD_LETTER_TO_FREE_LETTERS,
      letter
   };
}

export function removeLetterFromFreeLetters(letter) {
   return {
      type: types.REMOVE_LETTER_FROM_FREE_LETTERS,
      letter
   };
}

export function typeOnLesson() {
   return {
      type: types.TYPE_ON_LESSON
   };
}

export function selectMode(mode) {
   return (dispatch, getState) => {

      dispatch(setMode(mode));

      let state = getState();
      let learningModeState = state.learningMode;
      let lesson = '';

      switch (mode) {
         case 'fingers':

            lesson = learningModeState.lessonFingers;

            if (!lesson) {

               let lettersSet = getFingersSet();

               lettersSet.splice(learningModeState.fingersSetSize);

               lettersSet = concat.apply(null, lettersSet);

               lesson = generateLesson(learningModeState.maxWordLength, lettersSet);

               dispatch(setFingersLesson(lesson));

            }

            break;

         case 'free':

            lesson = learningModeState.lessonFree;

            if (!lesson) {

               let lettersFree = learningModeState.lettersFree

               if (!lettersFree.length) {

                  let keys = find(state.main.keyboards, {'name': state.main.keyboard}).keys

                  lettersFree = filter(keys, {
                     row: 'middle',
                     type: 'letter'
                  }).map(obj=> {
                     return obj.key;
                  });

                  dispatch(setFingersSetSize(lettersFree));

               }

               lesson = generateLesson(learningModeState.maxWordLength, lettersFree);

               dispatch(setFreeLesson(lesson));

            }

            break;
      }

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

      let size = _.uniqWith(resultForUnionWith, _.isEqual).length;

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