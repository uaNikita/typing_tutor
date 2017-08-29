import { connect } from 'react-redux';

import {
  setMode as setLearningMode,
  updateCurrentLessonFromCurrentMode,
  updateCharToType,
} from 'ReduxUtils/modules/learning-mode';
import ModeItem from './component.jsx';

const mapStateToProps = state => {
  const stateLearningMode = state.get('learningMode');

  return {
    learningMode: stateLearningMode.get('mode'),
    mode: state.getIn(['main', 'mode']),
  };
};

const mapDispatchToProps = dispatch => (
  {
    localSetLearningMode(learningMode) {
      dispatch(setLearningMode(learningMode));
    },

    localUpdateCurrentLessonFromCurrentMode() {
      dispatch(updateCurrentLessonFromCurrentMode());
    },

    localUpdateCharToType() {
      dispatch(updateCharToType());
    },
  }
);

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { mode } = stateProps;
  const {
    localSetLearningMode,
    localUpdateCurrentLessonFromCurrentMode,
    localUpdateCharToType,
  } = dispatchProps;

  return {
    ...stateProps,
    setLearningMode(learningMode) {
      localSetLearningMode(learningMode);

      localUpdateCurrentLessonFromCurrentMode();

      if (mode === 'learning') {
        localUpdateCharToType();
      }
    },
    ...ownProps,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ModeItem);
