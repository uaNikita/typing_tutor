import Immutable from 'immutable';
import _ from 'lodash';
import dayjs from 'dayjs';

import {
  tempCookie,
  getIdsFromCharacter,
  generateLesson,
  getFingersSet,
  getDefaultFingersSetSize,
  getDefaultFreeLetters,
} from 'Utils';

import { defaults } from 'Constants/defaultState';

import { fetchJSON } from '../fetch';

import {
  setIdsCharToType,
  pressWrongKeys,
  addTouch,
  processAction,
} from '../main';

import { processAddStatistic } from '../user';

const SET_STATE = 'learning/SET_STATE';
const CLEAR_STATE = 'learning/CLEAR_STATE';
const TYPE_ON_LESSON = 'learning/TYPE_ON_LESSON';

const SET_LEARNING_MODE = 'learning/SET_LEARNING_MODE';
const SET_CURRENT_LESSON = 'learning/SET_CURRENT_LESSON';

const UPDATE_FINGERS_OPTIONS = 'learning/UPDATE_FINGERS_OPTIONS';
const SET_FINGERS_EXAMPLE = 'learning/SET_FINGERS_EXAMPLE';

const UPDATE_FREE_OPTIONS = 'learning/UPDATE_FREE_OPTIONS';
const SET_FREE_EXAMPLE = 'learning/SET_FREE_EXAMPLE';

const SET_STATISTIC = 'learning/SET_STATISTIC';

const initialState = Immutable.fromJS(defaults.learning);

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STATE:
      return state.mergeDeep(action.data);

    case CLEAR_STATE:
      return state.merge(initialState);

    case TYPE_ON_LESSON:
      return state.update('lesson', (lesson) => {
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

    case UPDATE_FINGERS_OPTIONS:
      return state.updateIn(['fingers', 'options'], opts => opts.merge(action.options));

    case SET_FINGERS_EXAMPLE:
      return state.setIn(['fingers', 'example'], action.example);

    case UPDATE_FREE_OPTIONS:
      return state.updateIn(['free', 'options'], (opts) => {
        const { options } = action;

        // type can be add, delete, set
        if (options.letters) {
          const [type, value] = options.letters;

          const letters = opts.get('letters');

          options.letters = type === 'set'
            ? Immutable.Set(value)
            : letters[type](value);
        }

        return opts.merge(options);
      });

    case SET_FREE_EXAMPLE:
      return state.setIn(['free', 'example'], action.example);

    case SET_STATISTIC:
      return state.set('selectedId', state.get('entities').last().get('id'));

    default:
      return state;
  }
};

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const setState = data => ({
  type: SET_STATE,
  data,
});

export const setMode = mode => ({
  type: SET_LEARNING_MODE,
  mode,
});

export const setCurrentLesson = lesson => ({
  type: SET_CURRENT_LESSON,
  lesson,
});

export const updateFingersOptions = options => ({
  type: UPDATE_FINGERS_OPTIONS,
  options,
});

export const setFingersExample = example => ({
  type: SET_FINGERS_EXAMPLE,
  example,
});

export const updateFreeOptions = options => ({
  type: UPDATE_FREE_OPTIONS,
  options,
});

export const setFreeExample = example => ({
  type: SET_FREE_EXAMPLE,
  example,
});

export const typeOnLesson = () => ({
  type: TYPE_ON_LESSON,
});

export const processSetSettings = (() => {
  const deferredFetch = _.throttle(
    (dispatch, settings) => dispatch(fetchJSON('/syllable', {
      method: 'PATCH',
      body: settings,
    })),
    1000,
  );

  return settings => (dispatch, getState) => {
    const settingsToSave = settings;

    if (settingsToSave.free && settingsToSave.free.options) {
      dispatch(updateFreeOptions(settingsToSave.free.options));

      settingsToSave.free = getState().getIn(['learning', 'free', 'options']).toJS();
    }

    if (settings.fingers && settings.fingers.options) {
      dispatch(updateFingersOptions(settings.fingers.options));

      settingsToSave.fingers = getState().getIn(['learning', 'fingers', 'options']).toJS();
    }

    dispatch(setState(settingsToSave));

    return dispatch(processAction(
      () => tempCookie.path('learning', getState().get('learning')),
      () => deferredFetch(dispatch, settingsToSave),
    ));
  };
})();

export const processSetOptions = (() => {
  const deferredFetch = _.throttle(
    (dispatch, mode, options) => dispatch(fetchJSON('/syllable', {
      body: {
        [mode]: options,
      },
    })),
    1000,
  );

  return ({ mode, options }) => (dispatch, getState) => {
    switch (mode) {
      case 'fingers':
        dispatch(updateFingersOptions(options));
        break;
      case 'free':
        dispatch(updateFreeOptions(options));
        break;
      default:
    }

    return dispatch(processAction(
      () => tempCookie.path(
        `learning.${mode}.options`,
        getState().getIn(['learning', mode, 'options']).toJS(),
      ),
      () => deferredFetch(dispatch, mode, options),
    ));
  };
})();

const generateFingersLesson = () => (
  (dispatch, getState) => {
    const state = getState();

    const keys = state.getIn(['main', 'keys']).toJS();

    let fingersSet = getFingersSet(keys);

    fingersSet.splice(state.getIn(['learning', 'fingers', 'options', 'setSize']));

    fingersSet = _.concat.apply(null, fingersSet);

    return generateLesson({
      keyboard: state.getIn(['user', 'keyboard']),
      maxLettersInWord: state.getIn(['learning', 'fingers', 'options', 'maxLettersInWord']),
      letters: fingersSet,
    });
  }
);

const generateFreeLesson = () => (
  (dispatch, getState) => {
    const state = getState();
    const learningState = state.getIn(['learning', 'free', 'options']);

    return generateLesson({
      keyboard: state.getIn(['user', 'keyboard']),
      maxLettersInWord: learningState.get('maxLettersInWord'),
      letters: learningState.get('letters').toJS(),
    });
  }
);

export const setCurrentLessonFromCurrentMode = () => (
  (dispatch, getState) => {
    const learningState = getState().get('learning');

    const mode = learningState.get('mode');
    const example = learningState.getIn([mode, 'example']);

    dispatch(setCurrentLesson(example));
  }
);

export const generateAndSetLessonForMode = mode => (
  (dispatch, getState) => {
    let lesson;

    switch (mode) {
      case 'fingers':
        lesson = dispatch(generateFingersLesson());
        dispatch(setFingersExample(lesson));
        break;

      case 'free':
        lesson = dispatch(generateFreeLesson());
        dispatch(setFreeExample(lesson));
        break;
      default:
    }

    // if current mode is active then we change lesson for typing also
    const currentMode = getState().getIn(['learning', 'mode']);
    if (mode === currentMode) {
      dispatch(setCurrentLesson(lesson));
    }
  }
);

export const updateCharToType = () => (
  (dispatch, getState) => {
    const state = getState();

    let idsChar = '';

    const lessonRest = state.getIn(['learning', 'lesson', 'rest']);

    if (lessonRest) {
      idsChar = getIdsFromCharacter(
        state.getIn(['main', 'keys']).toJS(),
        lessonRest[0],
      );
    }

    dispatch(setIdsCharToType(idsChar));
  }
);

export const typeLearningMode = char => (
  (dispatch, getState) => {
    const state = getState();
    const learningState = state.get('learning');

    const lessonRest = learningState.getIn(['lesson', 'rest']);

    const idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), char);

    if (lessonRest[0] === char) {
      dispatch(typeOnLesson());

      dispatch(addTouch(true, char));

      // if this is last character of line need to refresh it
      if (lessonRest.length === 1) {
        let lesson = '';

        switch (learningState.get('mode')) {
          case 'fingers':
            lesson = dispatch(generateFingersLesson());
            dispatch(setFingersExample(lesson));
            break;

          case 'free':
            lesson = dispatch(generateFreeLesson());
            dispatch(setFreeExample(lesson));
            break;

          default:
        }

        dispatch(setCurrentLesson(lesson));
      }

      dispatch(updateCharToType());
    }
    else {
      dispatch(pressWrongKeys(idsChar));

      dispatch(addTouch(false, char));
    }

    const sessionStrat = state.getIn(['main', 'sessionStatistic', 'start']);

    if (dayjs(Date.now()).diff(sessionStrat, 'minute')) {
      dispatch(processAddStatistic());
    }
  }
);

export const initLessons = () => (
  (dispatch, getState) => {
    const state = getState();

    const keys = state.getIn(['main', 'keys']).toJS();
    const learningState = state.get('learning');

    if (!learningState.getIn(['fingers', 'options', 'setSize'])) {
      dispatch(processSetOptions({
        mode: 'fingers',
        options: {
          setSize: getDefaultFingersSetSize(keys),
        },
      }));
    }

    if (!learningState.getIn(['free', 'options', 'letters'])) {
      dispatch(processSetOptions({
        mode: 'free',
        options: {
          letters: ['set', getDefaultFreeLetters(keys)],
        },
      }));
    }

    const fingersExample = dispatch(generateFingersLesson());
    dispatch(setFingersExample(fingersExample));

    const freeExample = dispatch(generateFreeLesson());
    dispatch(setFreeExample(freeExample));

    let lesson;

    switch (learningState.get('mode')) {
      case 'fingers':
        lesson = fingersExample;
        break;

      case 'free':
        lesson = freeExample;
        break;

      default:
    }

    dispatch(setCurrentLesson(lesson));
  }
);
