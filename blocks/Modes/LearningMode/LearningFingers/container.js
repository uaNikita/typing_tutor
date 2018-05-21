import { connect } from 'react-redux';
import {
  processSetSizeFingers,
  processSetMaxLettersInWordFingers,
  updateFingersLesson,
  updateCurrentLessonFromCurrentMode,
  updateCharToType,
} from 'ReduxUtils/modules/modes/learning';

import { getFingersSet } from 'Utils';

import LearningFingers from './component.jsx';

const mapStateToProps = state => {
  const keys = state.getIn(['main', 'keys']).toJS();

  const stateLearningMode = state.get('learningMode');

  return {
    sizeFingers: stateLearningMode.get('setSizeFingers'),
    maxLettersInWord: stateLearningMode.get('maxLettersInWordFingers'),
    fingersSet: getFingersSet(keys),
    keys,
  };
};

const mapDispatchToProps = dispatch => ({
  setSizeFingers: size => {
    dispatch(processSetSizeFingers(size));

    dispatch(updateFingersLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    // dispatch(updateCharToType());
  },
  setMaxLettersInWord: length => {
    dispatch(processSetMaxLettersInWordFingers(length));

    dispatch(updateFingersLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    dispatch(updateCharToType());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFingers);
