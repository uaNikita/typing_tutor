import {
  TYPE_ON_LESSON,
  SET_LESSON,
  SET_LESSON_FINGERS_SET_SIZE,
  SET_LESSON_MAX_WORD_LENGTH,
  ADD_LETTER_TO_LESSON,
  REMOVE_LETTER_FROM_LESSON,
  SET_LEARNING_MODE,
  SET_LETTERS_FINGERS_LEARNING_MODE,
  SET_LETTERS_FREE_LEARNING_MODE
} from '../actions/learning-mode';
import {assign, clone, cloneDeep, remove} from 'lodash';

const INITIAL_STATE = {
  fingersSetSize: 9,

  maxWordLength: 5,

  lettersFingersMode: [],

  lettersFreeMode: [],

  // letters set, keyboard,
  mode: 'letters set',

  lesson: {
    typed: 'fkad lfdaj aslh sgk ljgkl lgd lfjlf lgh hshf hl',
    last: 'da'
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE_ON_LESSON:
      return assign({}, state, {
        lesson: {
          typed: state.lesson.typed + state.lesson.last[0],
          last: state.lesson.last.substring(1)
        }
      })

    case SET_LEARNING_MODE:
      return assign({}, state, {
        mode: action.mode
      });

    case SET_LESSON:
      return assign({}, state, {
        lesson: {
          typed: '',
          last: action.lesson
        }
      })

    case SET_LESSON_MAX_WORD_LENGTH:
      return assign({}, state, {
        maxWordLength: action.length
      });

    case SET_LETTERS_FINGERS_LEARNING_MODE:
      return assign({}, state, {
        lettersFingersMode: action.letters
      });

    case SET_LESSON_FINGERS_SET_SIZE:
      return assign({}, state, {
        fingersSetSize: action.size
      });

    case SET_LETTERS_FREE_LEARNING_MODE:
      return assign({}, state, {
        lettersFreeMode: action.letters
      });

    case ADD_LETTER_TO_LESSON:
      return (() => {
        let letters = clone(state.letters);

        _.remove(letters, function (letter) {
          return letter === action.letter;
        });

        letters.push(action.letter)

        return assign({}, state, {
          letters: letters
        });
      })();

    case REMOVE_LETTER_FROM_LESSON:
      return (() => {
        let letters = clone(state.letters);

        _.remove(letters, function (letter) {
          return letter === action.letter
        });

        return assign({}, state, {
          letters: letters
        });
      })();

    default:
      return state;

  }
};