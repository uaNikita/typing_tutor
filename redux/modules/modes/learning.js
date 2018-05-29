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

const SET_FINGERS_OPTIONS = 'learning/SET_FINGERS_OPTIONS';
const SET_FREE_OPTIONS = 'learning/SET_FREE_OPTIONS';

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
    setSize: 5,
  },

  free: {
    maxLettersInWord: 5,
    letters: Immutable.Set([]),
  },
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STATE:
      return state.merge(initialState);

    case TYPE_ON_LESSON:
      return state.update('lesson', lesson => {
        const typed = lesson.get('typed');
        const rest = lesson.get('rest');

        return lesson.merge({
          typed: typed + rest[0],
          rest: rest.substring(1),
        });
      });

    case SET_LEARNING_MODE:
      return state.set('mode', action.mode);

    case SET_CURRENT_LESSON:
      return state.set('lesson', Immutable.Map({
        typed: '',
        rest: action.lesson,
      }));

    case SET_FINGERS_OPTIONS:
      return state.update('fingers', fingers => fingers.merge(action.options));

    case SET_FREE_OPTIONS:
      return state.update('free', free => {
        const {
          options,
        } = action;

        if (options.letters) {
          options.letters = Immutable.Set(options.letters);
        }

        return free.merge(options);
      });

    case ADD_LETTER_TO_FREE_LETTERS:
      return state.updateIn(['free', 'letters'], letters => letters.add(action.letter));

    case REMOVE_LETTER_FROM_FREE_LETTERS:
      return state.updateIn(['free', 'letters'], letters => letters.delete(action.letter));

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

export const setFingersOptions = length => ({
  type: SET_FINGERS_OPTIONS,
  length,
});

export const setFreeOptions = options => ({
  type: SET_FREE_OPTIONS,
  options,
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
      () => ls.set('modes.learning.fingers', getState().getIn(['learningMode', 'fingers']).toJS()),
      () => dispatch(fetchJSON('/learning/fingers', {
        body: options,
      })),
    ));
  };

export const processSetFreeOptions = options =>
  (dispatch, getState) => {
    dispatch(setFreeOptions(options));

    return dispatch(processAction(
      () => ls.set('modes.learning.free', getState().getIn(['learningMode', 'free']).toJS()),
      () => dispatch(fetchJSON('/learning/free', {
        body: options,
      })),
    ));
  };

export const processAddLetterToFreeLetters = letter =>
  dispatch => {
    dispatch(addLetterToFreeLetters(letter));

    return dispatch(processAction(
      () => ls.set('modes.learning.free.letters', 'letter'),
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
      () => ls.set('modes.learning.free.letters', 'letter'),
      () => dispatch(fetchJSON('/learning/free', {
        body: {
          maxLettersInWordFree: 'letter',
        },
      })),
    ));
  };

export const generateFingersLesson = () => (dispatch, getState) => {
  const state = getState();

  const keys = state.getIn(['main', 'keys']).toJS();

  let fingersSet = getFingersSet(keys);

  fingersSet.splice(state.getIn(['learningMode', 'fingers', 'setSize']));

  fingersSet = _.concat.apply(null, fingersSet);

  return generateLesson(state.getIn(['learningMode', 'fingers', 'maxLettersInWord']), fingersSet);
};

export const generateFreeLesson = () => (dispatch, getState) => {
  const learningState = getState().get('learningMode');

  return generateLesson(
    learningState.getIn(['free', 'maxLettersInWord']),
    learningState.getIn(['free', 'letters']).toJS(),
  );
};

export const refreshCurrentLesson = () => (dispatch, getState) => {
  const learningState = getState().get('learningMode');

  let lesson = '';

  switch (learningState.get('mode')) {
    case 'fingers':
      lesson = dispatch(generateFingersLesson());
      break;

    case 'free':
      lesson = dispatch(generateFreeLesson());
      break;
  }

  dispatch(setCurrentLesson(lesson));
};

export const updateCharToType = () => (dispatch, getState) => {
  const state = getState();

  let idsChar = '';

  const lessonRest = state.getIn(['learningMode', 'lesson', 'rest']);

  if (lessonRest) {
    idsChar = getIdsFromCharacter(
      state.getIn(['main', 'keys']).toJS(),
      lessonRest[0],
    );
  }

  dispatch(setIdsCharToType(idsChar));
};

export const typeLearningMode = char =>
  (dispatch, getState) => {
    const state = getState();
    const learningModeState = state.get('learningMode');

    const lessonRest = learningModeState.getIn(['lesson', 'rest']);

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
      dispatch(refreshCurrentLesson());

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

    dispatch(setCurrentLesson(
      generateLesson(state.getIn(['learningMode', 'fingers', 'maxLettersInWord']), letters),
    ));

    dispatch(setFreeOptions({ letters }));
  };
