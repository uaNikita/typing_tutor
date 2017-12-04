import Immutable from 'immutable';
import _ from 'lodash';

import { setIdsCharToType, pressWrongKeys } from './main';
import { getIdsFromCharacter, generateLesson, getFingersSet } from '../../utils';

const CLEAR_STATE = 'learning-mode/CLEAR_STATE';
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
const ADD_SUCCESS_TYPE = 'learning-mode/ADD_SUCCESS_TYPE';
const ADD_ERROR_TYPE = 'learning-mode/ADD_ERROR_TYPE';

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

  successTypes: 0,

  errorTypes: 0,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

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

    case ADD_SUCCESS_TYPE:
      return state.set('successTypes', state.get('successTypes') + 1);

    case ADD_ERROR_TYPE:
      return state.set('errorTypes', state.get('errorTypes') + 1);

    default:
      return state;
  }
};

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const setMode = mode => ({
  type: SET_LEARNING_MODE,
  mode,
});

export const setCurrentLesson = lesson => ({
  type: SET_CURRENT_LESSON,
  lesson,
});

export const refreshCurrentLesson = () => ({
  type: REFRESH_CURRENT_LESSON,
});

export const setMaxLettersInWordFingers = length => ({
  type: SET_MAX_LETTERS_IN_WORD_FINGERS,
  length,
});

export const setMaxLettersInWordFree = length => ({
  type: SET_MAX_LETTERS_IN_WORD_FREE,
  length,
});

export const setLessonFingers = lesson => ({
  type: SET_LESSON_FINGERS,
  lesson,
});

export const setSetSizeFingers = size => ({
  type: SET_SET_SIZE_FINGERS,
  size,
});

export const setLessonFree = lesson => ({
  type: SET_LESSON_FREE,
  lesson,
});

export const setLettersFree = letters => ({
  type: SET_LETTERS_FREE,
  letters,
});

export const addLetterToFreeLetters = letter => ({
  type: ADD_LETTER_TO_FREE_LETTERS,
  letter,
});

export const removeLetterFromFreeLetters = letter => ({
  type: REMOVE_LETTER_FROM_FREE_LETTERS,
  letter,
});

export const typeOnLesson = () => ({
  type: TYPE_ON_LESSON,
});

export const addSuccesType = () => ({
  type: ADD_SUCCESS_TYPE,
});

export const addErrorType = () => ({
  type: ADD_ERROR_TYPE,
});

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
