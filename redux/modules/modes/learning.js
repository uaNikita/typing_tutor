import Immutable from 'immutable';
import _ from 'lodash';

import { getIdsFromCharacter, generateLesson, getFingersSet } from 'Utils';

import ls from 'Utils/ls';

import { fetchJSON } from 'ReduxUtils/modules/fetch';

import {
  setIdsCharToType,
  pressWrongKeys,
  addHit,
  addTypo,
  processAction,
} from '../main';

import { addStatisticWithTimeout } from '../user';

const CLEAR_STATE = 'learning/CLEAR_STATE';
const TYPE_ON_LESSON = 'learning/TYPE_ON_LESSON';

const SET_LEARNING_MODE = 'learning/SET_LEARNING_MODE';
const SET_CURRENT_LESSON = 'learning/SET_CURRENT_LESSON';
const REFRESH_CURRENT_LESSON = 'learning/REFRESH_CURRENT_LESSON';

const SET_FINGERS_OPTIONS = 'learning/SET_FINGERS_OPTIONS';
const SET_LESSON_FINGERS = 'learning/SET_LESSON_FINGERS';

const SET_LESSON_FREE = 'learning/SET_LESSON_FREE';
const SET_LETTERS_FREE = 'learning/SET_LETTERS_FREE';
const SET_MAX_LETTERS_IN_WORD_FREE = 'learning/SET_MAX_LETTERS_IN_WORD_FREE';
const ADD_LETTER_TO_FREE_LETTERS = 'learning/ADD_LETTER_TO_FREE_LETTERS';
const REMOVE_LETTER_FROM_FREE_LETTERS = 'learning/REMOVE_LETTER_FROM_FREE_LETTERS';

const SET_STATISTIC = 'text-mode/SET_STATISTIC';


const initialState = Immutable.fromJS({
  // fingers, free,
  mode: 'fingers',

  lesson: {
    typed: '',
    rest: '',
  },

  fingers: {
    maxLettersInWord: 5,
    setSize: 0,
    lesson: '',
  },

  free: {
    maxLettersInWord: 5,
    letters: Immutable.Set([]),
    lesson: '',
  },
});

const initialState = Immutable.fromJS({
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

    case SET_FINGERS_OPTIONS:
      return state.update('fingers', fingers => fingers.merge(action.options));

    case SET_MAX_LETTERS_IN_WORD_FREE:
      return state.set('maxLettersInWordFree', action.length);

    case SET_LESSON_FREE:
      return state.set('lessonFree', action.lesson);

    case SET_LETTERS_FREE:
      return state.set('lettersFree', Immutable.Set(action.letters));

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


export const setFingersOptions = length => ({
  type: SET_FINGERS_OPTIONS,
  length,
});

export const setMaxLettersInWordFree = length => ({
  type: SET_MAX_LETTERS_IN_WORD_FREE,
  length,
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

export const processSetFingersOptions = options =>
  (dispatch, getState) => {
    dispatch(setFingersOptions(options));

    return dispatch(processAction(
      () => ls.set('modes.learning.fingers', getState().getIn(['learningMode', 'fingers'])),
      () => dispatch(fetchJSON('/learning/fingers', {
        body: options,
      })),
    ));
  };

export const processSetMaxLettersInWordFree = letter =>
  dispatch => {
    dispatch(setMaxLettersInWordFree(letter));

    return dispatch(processAction(
      () => ls.set('modes.learning.maxLettersInWordFree', 'length'),
      () => dispatch(fetchJSON('/learning/free', {
        body: {
          maxLettersInWordFree: 'length',
        },
      })),
    ));
  };

export const processAddLetterToFreeLetters = letter =>
  dispatch => {
    dispatch(addLetterToFreeLetters(letter));

    return dispatch(processAction(
      () => ls.set('modes.learning.lettersFree', 'letter'),
      () => dispatch(fetchJSON('/learning/free', {
        body: {
          maxLettersInWordFree: 'letter',
        },
      })),
    ));
  };

export const processRemoveLetterToFreeLetters = letter =>
  dispatch => {
    dispatch(removeLetterFromFreeLetters(letter));

    return dispatch(processAction(
      () => ls.set('modes.learning.lettersFree', 'letter'),
      () => dispatch(fetchJSON('/learning/free', {
        body: {
          maxLettersInWordFree: 'letter',
        },
      })),
    ));
  };


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

export const refreshFingersLesson = () => (dispatch, getState) => {
  const state = getState();

  const keys = state.getIn(['main', 'keys']).toJS();

  let fingersSet = getFingersSet(keys);

  fingersSet.splice(state.getIn(['learningMode', 'setSizeFingers']));

  fingersSet = _.concat.apply(null, fingersSet);

  const lesson = generateLesson(state.getIn(['learningMode', 'fingers', 'maxLettersInWord']), fingersSet);

  dispatch(setFingersOptions({
    lesson,
  }));
};

export const refreshFreeLesson = () => (dispatch, getState) => {
  const learningState = getState().get('learningMode');

  const lesson = generateLesson(
    learningState.get('maxLettersInWordFree'),
    learningState.get('lettersFree'),
  );

  dispatch(setLessonFree(lesson));
};

export const updateCharToType = () => (dispatch, getState) => {
  const state = getState();

  let idsChar = '';

  if (state.getIn(['learningMode', 'lessonRest'])) {
    idsChar = getIdsFromCharacter(
      state.getIn(['main', 'keys']).toJS(),
      state.getIn(['learningMode', 'lessonRest'])[0],
    );
  }

  dispatch(setIdsCharToType(idsChar));
};

export const typeLearningMode = char =>
  (dispatch, getState) => {
    const state = getState();
    const learningModeState = state.get('learningMode');

    const lessonRest = learningModeState.get('lessonRest');

    const idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), char);

    if (lessonRest[0] === char) {
      dispatch(typeOnLesson());

      dispatch(addHit(char));

      dispatch(updateCharToType());
    }
    else {
      dispatch(pressWrongKeys(idsChar));

      dispatch(addTypo(char));
    }

    addStatisticWithTimeout(dispatch);

    if (!lessonRest) {
      switch (learningModeState.get('mode')) {
        case 'fingers':
          dispatch(refreshFingersLesson());

          dispatch(setCurrentLesson(learningModeState.get('lessonFingers')));
          break;
        case 'free':
          dispatch(refreshFreeLesson());

          dispatch(setCurrentLesson(learningModeState.get('lessonFree')));

          break;
      }

      dispatch(updateCharToType());
    }
  };

export const initLessons = () =>
  (dispatch, getState) => {
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

    dispatch(setFingersOptions({
      setSize: size,
    }));

    const letters = defaultKeys.map(obj => obj.key);

    // fingers mode
    const lessonFingers = generateLesson(state.getIn(['learningMode', 'fingers', 'maxLettersInWord']), letters);

    dispatch(setFingersOptions({
      lesson: lessonFingers,
    }));

    dispatch(setCurrentLesson(lessonFingers));

    dispatch(setLettersFree(letters));

    // different lesson for free mode
    const lessonFree = generateLesson(state.getIn(['learningMode', 'maxLettersInWordFree']), letters);

    dispatch(setLessonFree(lessonFree));
  };
