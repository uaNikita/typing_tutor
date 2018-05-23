import { connect } from 'react-redux';
import {
  processSetFingersOptions,
  refreshFingersLesson,
  updateCurrentLessonFromCurrentMode,
  updateCharToType,
} from 'ReduxUtils/modules/modes/learning';

import { getFingersSet } from 'Utils';

import LearningFingers from './component.jsx';

const mapStateToProps = state => {
  const keys = state.getIn(['main', 'keys']).toJS();

  const stateFingers = state.getIn('learningMode', 'fingers');

  return {
    sizeFingers: stateFingers.get('setSize'),
    maxLettersInWord: stateFingers.get('maxLettersInWord'),
    fingersSet: getFingersSet(keys),
    keys,
  };
};

const mapDispatchToProps = dispatch => ({
  setSizeFingers: size => {
    dispatch(processSetFingersOptions({
      setSize: size,
    }));

    dispatch(refreshFingersLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    // dispatch(updateCharToType());
  },
  setMaxLettersInWord: length => {
    dispatch(processSetFingersOptions({
      maxLettersInWord: length,
    }));

    dispatch(refreshFingersLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    dispatch(updateCharToType());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFingers);
