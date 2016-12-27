import * as types from '../constants/action-types/learning-mode';
import {assign, clone, cloneDeep, remove, pull} from 'lodash';

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

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {

      case types.REFRESH_CURRENT_LESSON:
         return assign({}, state, {
            lesson: {
               typed: state.lesson.typed + state.lesson.last,
               last: ''
            }
         })

      case types.TYPE_ON_LESSON:
         return assign({}, state, {
            lesson: {
               typed: state.lesson.typed + state.lesson.last[0],
               last: state.lesson.last.substring(1)
            }
         })

      case types.SET_LEARNING_MODE:
         return assign({}, state, {
            mode: action.mode,
         });

      case types.SET_CURRENT_LESSON:
         return assign({}, state, {
            lesson: {
               typed: '',
               last: action.lesson
            }
         })

      case types.SET_MAX_WORD_LENGTH:
         return assign({}, state, {
            maxWordLength: action.length
         });

      case types.SET_FINGERS_SET_SIZE:
         return assign({}, state, {
            fingersSetSize: action.size
         });

      case types.SET_FINGERS_LESSON:
         return assign({}, state, {
            lessonFingers: action.lesson
         });

      case types.SET_FREE_LESSON:
         return assign({}, state, {
            lessonFree: action.lesson
         });

      case types.SET_FREE_LETTERS:
         return assign({}, state, {
            lettersFree: action.letters
         });

      case types.ADD_LETTER_TO_FREE_LETTERS:
         return assign({}, state, {
            lettersFree: [
               ...state.lettersFree,
               action.letter
            ]
         });

      case types.REMOVE_LETTER_FROM_FREE_LETTERS:
         return assign({}, state, {
            lettersFree: [
               ...pull(state.lettersFree, action.letter)
            ]
         });

      default:
         return state;

   }
};