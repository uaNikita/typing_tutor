import Immutable from 'immutable';
import _ from 'lodash';

import {
  setIdsCharToType,
  pressWrongKeys,
  addSuccesType,
  addErrorType,
} from './main';

import {
  getIdsFromCharacter,
  generateLesson,
  getFingersSet,
} from '../../utils';

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

const initialState = Immutable.Map({
  // fingers, free,
  mode: 'fingers',

  maxLettersInWordFingers: 5,

  setSizeFingers: 0,

  lessonFingers: '',

  maxLettersInWordFree: 5,

  lettersFree: Immutable.Set([]),

  lessonFree: '',

  lessonTyped: '',

  lessonRest: '',
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REFRESH_CURRENT_LESSON:
      return state.merge({
        lessonTyped: '',
        lessonRest: state.get('lessonTyped') + state.get('lessonRest'),
      });

    case TYPE_ON_LESSON:
      return state.merge({
        lessonTyped: state.get('lessonTyped') + state.get('lessonRest')[0],
        lessonRest: state.get('lessonRest').substring(1),
      });

    case SET_LEARNING_MODE:
      return state.set('mode', action.mode);

    case SET_CURRENT_LESSON:
      return state.merge({
        lessonTyped: '',
        lessonRest: action.lesson,
      });

    case SET_MAX_LETTERS_IN_WORD_FINGERS:
      return state.set('maxLettersInWordFingers', action.length);

    case SET_MAX_LETTERS_IN_WORD_FREE:
      return state.set('maxLettersInWordFree', action.length);

    case SET_SET_SIZE_FINGERS:
      return state.set('setSizeFingers', action.size);

    case SET_LESSON_FINGERS:
      return state.set('lessonFingers', action.lesson);

    case SET_LESSON_FREE:
      return state.set('lessonFree', action.lesson);

    case SET_LETTERS_FREE:
      return state.set('lettersFree', action.letters);

    case ADD_LETTER_TO_FREE_LETTERS:
      return state.update('lettersFree', letters => letters.add(action.letter));

    case REMOVE_LETTER_FROM_FREE_LETTERS:
      return state.update('lettersFree', letters => letters.delete(action.letter));

    default:
      return state;
  }
};

export function setMode(mode) {
  return {
    type: SET_LEARNING_MODE,
    mode,
  };
}

export function setCurrentLesson(lesson) {
  return {
    type: SET_CURRENT_LESSON,
    lesson,
  };
}

export function refreshCurrentLesson() {
  return {
    type: REFRESH_CURRENT_LESSON,
  };
}

export function setMaxLettersInWordFingers(length) {
  return {
    type: SET_MAX_LETTERS_IN_WORD_FINGERS,
    length,
  };
}

export function setMaxLettersInWordFree(length) {
  return {
    type: SET_MAX_LETTERS_IN_WORD_FREE,
    length,
  };
}

export function setLessonFingers(lesson) {
  return {
    type: SET_LESSON_FINGERS,
    lesson,
  };
}

export function setSetSizeFingers(size) {
  return {
    type: SET_SET_SIZE_FINGERS,
    size,
  };
}

export function setLessonFree(lesson) {
  return {
    type: SET_LESSON_FREE,
    lesson,
  };
}

export function setLettersFree(letters) {
  return {
    type: SET_LETTERS_FREE,
    letters,
  };
}

export function addLetterToFreeLetters(letter) {
  return {
    type: ADD_LETTER_TO_FREE_LETTERS,
    letter,
  };
}

export function removeLetterFromFreeLetters(letter) {
  return {
    type: REMOVE_LETTER_FROM_FREE_LETTERS,
    letter,
  };
}

export function typeOnLesson() {
  return {
    type: TYPE_ON_LESSON,
  };
}

export function updateCurrentLessonFromCurrentMode() {
  return (dispatch, getState) => {
    const learningState = getState().get('learningMode');

    let lesson;

    switch (learningState.get('mode')) {
      case 'fingers':
        lesson = learningState.get('lessonFingers');
        break;

      case 'free':
        lesson = learningState.get('lessonFree');
        break;
    }

    dispatch(setCurrentLesson(lesson));
  };
}

export function updateFingersLesson() {
  return (dispatch, getState) => {
    const state = getState();

    const keys = state.getIn(['main', 'keys']).toJS();

    let fingersSet = getFingersSet(keys);

    fingersSet.splice(state.getIn(['learningMode', 'setSizeFingers']));

    fingersSet = _.concat.apply(null, fingersSet);

    const lesson = generateLesson(state.getIn(['learningMode', 'maxLettersInWordFingers']), fingersSet);

    dispatch(setLessonFingers(lesson));
  };
}

export function updateFreeLesson() {
  return (dispatch, getState) => {
    const learningState = getState().get('learningMode');

    const lesson = generateLesson(learningState.get('maxLettersInWordFree'), learningState.get('lettersFree'));

    dispatch(setLessonFree(lesson));
  };
}

export function updateCharToType() {
  return (dispatch, getState) => {
    const state = getState();

    let idsChar = '';

    if (state.getIn(['learningMode', 'lessonRest'])) {
      idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), state.getIn(['learningMode', 'lessonRest'])[0]);
    }

    dispatch(setIdsCharToType(idsChar));
  };
}

export function typeLearningMode(char) {
  return (dispatch, getState) => {
    const state = getState();

    if (state.getIn(['learningMode', 'lessonRest'])) {
      const idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), char);

      if (state.getIn(['learningMode', 'lessonRest'])[0] === char) {
        dispatch(typeOnLesson());

        dispatch(addSuccesType());

        dispatch(updateCharToType());
      }
      else {
        dispatch(pressWrongKeys(idsChar));

        dispatch(addErrorType());
      }
    }
    else {
      switch (state.learningMode.mode) {
        case 'fingers':

          dispatch(updateFingersLesson());

          dispatch(setCurrentLesson(getState().getIn(['learningMode', 'lessonFingers'])));

          break;
        case 'free':

          dispatch(updateFreeLesson());

          dispatch(setCurrentLesson(getState().getIn(['learningMode', 'lessonFree'])));

          break;
      }
    }
  };
}

export function updateLearningState() {
  return (dispatch, getState) => {
    const state = getState();

    const defaultKeys = _.filter(state.getIn(['main', 'keys']).toJS(), {
      row: 'middle',
      type: 'letter',
    });

    const size = _(defaultKeys)
      .map(o => ({
        finger: o.finger,
        hand: o.hand,
      }))
      .uniqWith(_.isEqual)
      .value()
      .length;

    dispatch(setSetSizeFingers(size));

    const letters = defaultKeys.map(obj => obj.key);

    let lesson = generateLesson(state.getIn(['learningMode', 'maxLettersInWordFingers']), letters);

    dispatch(setLessonFingers(lesson));

    dispatch(setCurrentLesson(lesson));

    dispatch(setLettersFree(letters));

    // different lesson for free mode
    lesson = generateLesson(state.getIn(['learningMode', 'maxLettersInWordFree']), letters);

    dispatch(setLessonFree(lesson));
  };
}