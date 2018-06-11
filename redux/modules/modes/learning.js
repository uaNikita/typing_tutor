import Immutable from 'immutable';
import _ from 'lodash';

import { getIdsFromCharacter, generateLesson, getFingersSet } from 'Utils';
import temp from 'Utils/temp';
import defaults from 'Constants/defaultState';

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

const UPDATE_FINGERS_OPTIONS = 'learning/UPDATE_FINGERS_OPTIONS';
const SET_FINGERS_EXAMPLE = 'learning/SET_FINGERS_EXAMPLE';

const UPDATE_FREE_OPTIONS = 'learning/UPDATE_FREE_OPTIONS';
const SET_FREE_EXAMPLE = 'learning/SET_FREE_EXAMPLE';

const SET_STATISTIC = 'learning/SET_STATISTIC';

const initialState = Immutable.fromJS(defaults.learning);

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

    case UPDATE_FINGERS_OPTIONS:
      return state.updateIn(['fingers', 'options'], opts => opts.merge(action.options));

    case SET_FINGERS_EXAMPLE:
      return state.setIn(['fingers', 'example'], action.example);

    case UPDATE_FREE_OPTIONS:
      return state.updateIn(['free', 'options'], opts => {
        const { options } = action;

        // type can be add, delete, set
        if (options.letters) {
          const [type, value] = options.letters;

          const letters = opts.get('letters');

          options.letters = type === 'set' ?
            Immutable.Set(value) :
            letters[type](value);
        }

        return opts.merge(options);
      });

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

export const processUpdateFingersOptions = options =>
  (dispatch, getState) => {
    dispatch(updateFingersOptions(options));

    return dispatch(processAction(
      () => temp.path(
        'learning.fingers.options',
        getState().getIn(['learning', 'fingers', 'options']).toJS(),
      ),
      () => dispatch(fetchJSON('/learning/fingers', {
        body: options,
      })),
    ));
  };

export const generateFingersLesson = () =>
  (dispatch, getState) => {
    const state = getState();

    const keys = state.getIn(['main', 'keys']).toJS();

    let fingersSet = getFingersSet(keys);

    fingersSet.splice(state.getIn(['learning', 'fingers', 'options', 'setSize']));

    fingersSet = _.concat.apply(null, fingersSet);

    return generateLesson(
      state.getIn(['learning', 'fingers', 'options', 'maxLettersInWord']),
      fingersSet,
    );
  };

export const updateFingersOptionsAndExample = options =>
  dispatch => {
    dispatch(processUpdateFingersOptions(options));

    const example = dispatch(generateFingersLesson());

    dispatch(setFingersExample(example));
  };

export const processUpdateFreeOptions = options =>
  (dispatch, getState) => {
    dispatch(updateFreeOptions(options));

    return dispatch(processAction(
      () => temp.path(
        'learning.free.options',
        getState().getIn(['learning', 'free', 'options']).toJS(),
      ),
      () => dispatch(fetchJSON('/learning/free', {
        body: options,
      })),
    ));
  };

export const generateFreeLesson = () =>
  (dispatch, getState) => {
    const learningState = getState().getIn(['learning', 'free', 'options']);

    return generateLesson(
      learningState.get('maxLettersInWord'),
      learningState.get('letters').toJS(),
    );
  };

export const updateFreeOptionsAndExample = options =>
  dispatch => {
    dispatch(processUpdateFreeOptions(options));

    const example = dispatch(generateFreeLesson());

    dispatch(setFreeExample(example));
  };

export const refreshCurrentLesson = () => (dispatch, getState) => {
  const learningState = getState().get('learning');

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

  const lessonRest = state.getIn(['learning', 'lesson', 'rest']);

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
    const learningState = state.get('learning');

    const lessonRest = learningState.getIn(['lesson', 'rest']);

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

    if (!state.getIn(['learning', 'fingers', 'options', 'setSize'])) {
      const size = _(defaultKeys)
        .map(o => ({
          finger: o.finger,
          hand: o.hand,
        }))
        .uniqWith(_.isEqual)
        .value()
        .length;

      dispatch(updateFingersOptions({
        setSize: size,
      }));
    }

    if (!state.getIn(['learning', 'fingers', 'example'])) {
      const fingersExample = dispatch(generateFingersLesson());

      dispatch(setFingersExample(fingersExample));
    }

    const letters = defaultKeys.map(obj => obj.key);

    const lesson = generateLesson(
      state.getIn(['learning', 'fingers', 'options', 'maxLettersInWord']),
      letters,
    );

    dispatch(setCurrentLesson(lesson));

    if (!state.getIn(['learning', 'free', 'options', 'letters']).size) {
      dispatch(updateFreeOptions({
        letters: ['set', letters],
      }));
    }
  };
