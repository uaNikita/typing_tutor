import { connect } from 'react-redux';
import {
  setSetSizeFingers,
  setMaxLettersInWordFingers,
  updateFingersLesson,
  updateCurrentLessonFromCurrentMode,
  updateCharToType,
} from 'ReduxUtils/modules/learning-mode';

import { getFingersSet } from 'Utils';

import LearningFingers from './component.jsx';

const mapStateToProps = state => {
  const keys = state.getIn(['main', 'keys']).toJS();

  const stateLearningMode = state.get('learningMode');

  return {
    setSizeFingers: stateLearningMode.get('setSizeFingers'),
    maxLettersInWord: stateLearningMode.get('maxLettersInWordFingers'),
    fingersSet: getFingersSet(keys),
    keys,
  };
};

const mapDispatchToProps = dispatch => ({
  setFingersSetSize: size => {
    dispatch(setSetSizeFingers(size));

    dispatch(updateFingersLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    // dispatch(updateCharToType());
  },
  setMaxLettersInWord: length => {
    dispatch(setMaxLettersInWordFingers(length));

    dispatch(updateFingersLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    dispatch(updateCharToType());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFingers);
