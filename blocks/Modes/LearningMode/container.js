import { connect } from 'react-redux';

import {
  setMode as setLearningMode,
  updateCurrentLessonFromCurrentMode,
  updateCharToType,
} from 'ReduxUtils/modules/modes/learning';
import LearningMode from './component.jsx';

const mapStateToProps = state => {
  const stateLearningMode = state.get('learningMode');

  return {
    lesson: stateLearningMode.get('lessonRest'),
    learningMode: stateLearningMode.get('mode'),
    mode: state.getIn(['main', 'mode']),
  };
};

const mapDispatchToProps = dispatch => ({
  localSetLearningMode: (...args) => dispatch(setLearningMode(...args)),
  localUpdateCurrentLessonFromCurrentMode: () => dispatch(updateCurrentLessonFromCurrentMode()),
  localUpdateCharToType: () => dispatch(updateCharToType()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { mode } = stateProps;
  const {
    localSetMode,
    localSetLearningMode,
    localUpdateCurrentLessonFromCurrentMode,
    localUpdateCharToType,
  } = dispatchProps;

  return {
    ...stateProps,

    setMainMode(mainMode) {
      localSetMode(mainMode);

      localUpdateCharToType();
    },

    localSetLearningMode(learningMode) {
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
)(LearningMode);
