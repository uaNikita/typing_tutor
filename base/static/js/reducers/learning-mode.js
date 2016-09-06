import {
  TYPE_ON_LESSON,
  SET_LESSON,
  SET_LESSON_ALPHABET_SIZE,
  SET_LESSON_MAX_WORD_LENGTH,
  SET_LEARNING_MODE
} from '../actions/learning-mode';
import {assign, cloneDeep} from 'lodash';

const INITIAL_STATE = {
  alphabetSize: 9,

  maxWordLength: 5,

  lesson: {
    typed: 'fkad lfdaj aslh sgk ljgkl lgd lfjlf lgh hshf hl',
    last: 'da'
  },

  // letters set, keyboard,
  mode: 'letters set'
};

const generateLesson = (() => {
  let minWordLength = 3;
  let maxChars = 50;

  return (alphabetRange, maxWordLength, keys) => {
    let lesson = '';

    let charset = keys.reduce((charset, key) => {

      if (key.type === 'letter') {
        charset.push(key.id)
      }

      return charset

    }, []);

    let wordLength;

    while (lesson.length <= maxChars) {
      wordLength = random(minWordLength, maxWordLength);

      if (lesson.length + wordLength > maxChars) {
        wordLength = maxChars - lesson.length;

        if (wordLength < 3) {
          break;
        }
      }

      times(wordLength, function () {
        let idxLetter = random(0, alphabetRange - 1);

        lesson += charset[idxLetter];
      });

      lesson += ' ';

    }

    lesson = lesson.slice(0, -1)

    return lesson;

  }
})();

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
      console.log('SET_LEARNING_MODE', action.mode);
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

    case SET_LESSON_ALPHABET_SIZE:
      return assign({}, state, {
        alphabetSize: action.size
      });


    case SET_LESSON_MAX_WORD_LENGTH:
      return assign({}, state, {
        maxWordLength: action.length
      });

    default:
      return state;

  }
};