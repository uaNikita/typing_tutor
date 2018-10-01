import { connect } from 'react-redux';

import { setMode, setCurrentLesson } from 'ReduxUtils/reducers/modes/learning';

import Component from './component';

const mapStateToProps = (state) => {
  const learningState = state.get('learning');

  return {
    currentMode: learningState.get('mode'),
    fingersExample: learningState.getIn(['fingers', 'example']),
    freeExample: learningState.getIn(['free', 'example']),
  };
};

const mapDispatchToProps = dispatch => ({
  setMode: (...args) => dispatch(setMode(...args)),
  setCurrentLesson: (...args) => dispatch(setCurrentLesson(...args)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  currentMode: stateProps.currentMode,
  setMode: (mode) => {
    dispatchProps.setMode(mode);

    let lesson;

    switch (mode) {
      case 'fingers':
        lesson = stateProps.fingersExample;
        break;

      case 'free':
        lesson = stateProps.freeExample;
        break;

      default:
    }

    dispatchProps.setCurrentLesson(lesson);
  },
  ...ownProps,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Component);
