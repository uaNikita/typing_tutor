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
  pressWrongKeys,
  addTouch,
  processAction, setCharToType,
} from '../main';

import { processAddStatistic } from '../user';

const SET_STATE = 'syllable/SET_STATE';
const CLEAR_STATE = 'syllable/CLEAR_STATE';
const TYPE_ON_LESSON = 'syllable/TYPE_ON_LESSON';

const SET_SYLLABLE_MODE = 'syllable/SET_SYLLABLE_MODE';
const SET_CURRENT_LESSON = 'syllable/SET_CURRENT_LESSON';

const UPDATE_FINGERS_OPTIONS = 'syllable/UPDATE_FINGERS_OPTIONS';
const SET_FINGERS_EXAMPLE = 'syllable/SET_FINGERS_EXAMPLE';

const UPDATE_FREE_OPTIONS = 'syllable/UPDATE_FREE_OPTIONS';
const SET_FREE_EXAMPLE = 'syllable/SET_FREE_EXAMPLE';

const SET_STATISTIC = 'syllable/SET_STATISTIC';

const initialState = Immutable.fromJS(defaults.syllable);

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

    case SET_SYLLABLE_MODE:
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
  type: SET_SYLLABLE_MODE,
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

      settingsToSave.free = getState().getIn(['syllable', 'free', 'options']).toJS();
    }

    if (settings.fingers && settings.fingers.options) {
      dispatch(updateFingersOptions(settings.fingers.options));

      settingsToSave.fingers = getState().getIn(['syllable', 'fingers', 'options']).toJS();
    }

    dispatch(setState(settingsToSave));

    return dispatch(processAction(
      () => tempCookie.path('syllable', getState().get('syllable')),
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
        `syllable.${mode}.options`,
        getState().getIn(['syllable', mode, 'options']).toJS(),
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

    fingersSet.splice(state.getIn(['syllable', 'fingers', 'options', 'setSize']));

    fingersSet = _.concat.apply(null, fingersSet);

    return generateLesson({
      keyboard: state.getIn(['user', 'keyboard']),
      maxLettersInWord: state.getIn(['syllable', 'fingers', 'options', 'maxLettersInWord']),
      letters: fingersSet,
    });
  }
);

const generateFreeLesson = () => (
  (dispatch, getState) => {
    const state = getState();
    const syllableState = state.getIn(['syllable', 'free', 'options']);

    return generateLesson({
      keyboard: state.getIn(['user', 'keyboard']),
      maxLettersInWord: syllableState.get('maxLettersInWord'),
      letters: syllableState.get('letters').toJS(),
    });
  }
);

export const setCurrentLessonFromCurrentMode = () => (
  (dispatch, getState) => {
    const syllableState = getState().get('syllable');

    const mode = syllableState.get('mode');
    const example = syllableState.getIn([mode, 'example']);

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
    const currentMode = getState().getIn(['syllable', 'mode']);
    if (mode === currentMode) {
      dispatch(setCurrentLesson(lesson));
    }
  }
);

export const updateCharToType = () => (
  (dispatch, getState) => {
    const lessonRest = getState().getIn(['syllable', 'lesson', 'rest']);
    const char = lessonRest ? lessonRest[0] : null;

    dispatch(setCharToType(char));
  }
);

export const typeSyllableMode = char => (
  (dispatch, getState) => {
    const state = getState();
    const syllableState = state.get('syllable');

    const lessonRest = syllableState.getIn(['lesson', 'rest']);

    const idsChar = getIdsFromCharacter(state.getIn(['main', 'keys']).toJS(), char);

    if (lessonRest[0] === char) {
      dispatch(typeOnLesson());

      dispatch(addTouch(true, char));

      // if this is last character of line need to refresh it
      if (lessonRest.length === 1) {
        let lesson = '';

        switch (syllableState.get('mode')) {
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

    if (dayjs(Date.now()).diff(sessionStrat, 'second') > 10) {
      dispatch(processAddStatistic());
    }
  }
);

export const initLessons = () => (
  (dispatch, getState) => {
    const state = getState();

    const keys = state.getIn(['main', 'keys']).toJS();
    const syllableState = state.get('syllable');

    if (!syllableState.getIn(['fingers', 'options', 'setSize'])) {
      dispatch(processSetOptions({
        mode: 'fingers',
        options: {
          setSize: getDefaultFingersSetSize(keys),
        },
      }));
    }

    if (!syllableState.getIn(['free', 'options', 'letters'])) {
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

    switch (syllableState.get('mode')) {
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
