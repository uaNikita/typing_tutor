import { connect } from 'react-redux';
import { processSetSettings } from 'ReduxUtils/reducers/user';
import {
  processSetOptionsAndUpdate,
  setMode,
  setCurrentLesson,
} from 'ReduxUtils/reducers/modes/learning';

import { getFingersSet } from 'Utils';

import Component from './component';

const mapStateToProps = (state) => {
  const keys = state.getIn(['main', 'keys']).toJS();
  const stateFingers = state.getIn(['learning', 'fingers']);

  return {
    example: stateFingers.get('example'),
    options: stateFingers.get('options').toJS(),
    fingersSet: getFingersSet(keys),
    keys,
  };
};

const mapDispatchToProps = dispatch => ({
  setMode: mode => dispatch(processSetSettings({ mode })),
  setLearningMode: (...args) => dispatch(setMode(...args)),
  setCurrentLesson: (...args) => dispatch(setCurrentLesson(...args)),
  updateOptions: options => dispatch(processSetOptionsAndUpdate({
    mode: 'fingers',
    options,
  })),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  updateOptions: dispatchProps.updateOptions,
  start: () => {
    dispatchProps.setMode('learning');

    dispatchProps.setLearningMode('fingers');

    dispatchProps.setCurrentLesson(stateProps.example);

    ownProps.history.push('/');
  },
  ...ownProps,
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Component);
