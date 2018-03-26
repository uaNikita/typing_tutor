import Immutable from 'immutable';
import _ from 'lodash';

import { getIdsFromCharacter, generateLesson, getFingersSet } from 'Utils';

import {
  setIdsCharToType,
  pressWrongKeys,
  addHit,
  addTypo,
} from '../main';

import {
  addStatisticWithTimeout,
} from '../user';

const CLEAR_STATE = 'learning/CLEAR_STATE';
const TYPE_ON_LESSON = 'learning/TYPE_ON_LESSON';

const SET_LEARNING_MODE = 'learning/SET_LEARNING_MODE';
const SET_CURRENT_LESSON = 'learning/SET_CURRENT_LESSON';
const REFRESH_CURRENT_LESSON = 'learning/REFRESH_CURRENT_LESSON';

const SET_LESSON_FINGERS = 'learning/SET_LESSON_FINGERS';
const SET_SET_SIZE_FINGERS = 'learning/SET_SET_SIZE_FINGERS';
const SET_MAX_LETTERS_IN_WORD_FINGERS = 'learning/SET_MAX_LETTERS_IN_WORD_FINGERS';

const SET_LESSON_FREE = 'learning/SET_LESSON_FREE';
const SET_LETTERS_FREE = 'learning/SET_LETTERS_FREE';
const SET_MAX_LETTERS_IN_WORD_FREE = 'learning/SET_MAX_LETTERS_IN_WORD_FREE';
const ADD_LETTER_TO_FREE_LETTERS = 'learning/ADD_LETTER_TO_FREE_LETTERS';
const REMOVE_LETTER_FROM_FREE_LETTERS = 'learning/REMOVE_LETTER_FROM_FREE_LETTERS';

const SET_STATISTIC = 'text-mode/SET_STATISTIC';

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

    case SET_STATISTIC:
      return state.set('selectedId', state.get('entities').last().get('id'));

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

export const updateCurrentLessonFromCurrentMode = () => (dispatch, getState) => {
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

export const updateFingersLesson = () => (dispatch, getState) => {
  const state = getState();

  const keys = state.getIn(['main', 'keys']).toJS();

  let fingersSet = getFingersSet(keys);

  fingersSet.splice(state.getIn(['learningMode', 'setSizeFingers']));

  fingersSet = _.concat.apply(null, fingersSet);

  const lesson = generateLesson(state.getIn(['learningMode', 'maxLettersInWordFingers']), fingersSet);

  dispatch(setLessonFingers(lesson));
};


export const updateFreeLesson = () => (dispatch, getState) => {
  const learningState = getState().get('learningMode');

  const lesson = generateLesson(learningState.get('maxLettersInWordFree'), learningState.get('lettersFree'));

  dispatch(setLessonFree(lesson));
};

export const updateCharToType = () => (dispatch, getState) => {
  const state = getState();

  let idsChar = '';

  if (state.getIn(['learningMode', 'lessonRest'])) {
    idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), state.getIn(['learningMode', 'lessonRest'])[0]);
  }

  dispatch(setIdsCharToType(idsChar));
};

export const typeLearningMode = char => (dispatch, getState) => {
  const state = getState();
  const learningModeState = state.get('learningMode');

  const charToType = learningModeState.get('lessonRest')[0];

  if (charToType) {
    const idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), char);

    if (charToType === char) {
      dispatch(typeOnLesson());

      dispatch(addHit(char));

      dispatch(updateCharToType());
    }
    else {
      dispatch(pressWrongKeys(idsChar));

      dispatch(addTypo(char));
    }

    addStatisticWithTimeout(dispatch);
  }
  else {
    // update fingers
    if (learningModeState.get('mode') === 'fingers') {
      dispatch(updateFingersLesson());

      dispatch(setCurrentLesson(learningModeState.get('lessonFingers')));
    }
    // update free
    else {
      dispatch(updateFreeLesson());

      dispatch(setCurrentLesson(learningModeState.get('lessonFree')));
    }

    dispatch(updateCharToType());
  }
};

export const initLessons = () => (dispatch, getState) => {
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

  // fingers mode
  const lessonFingers = generateLesson(state.getIn(['learningMode', 'maxLettersInWordFingers']), letters);

  dispatch(setLessonFingers(lessonFingers));

  dispatch(setCurrentLesson(lessonFingers));

  dispatch(setLettersFree(letters));

  // different lesson for free mode
  const lessonFree = generateLesson(state.getIn(['learningMode', 'maxLettersInWordFree']), letters);

  dispatch(setLessonFree(lessonFree));
};
