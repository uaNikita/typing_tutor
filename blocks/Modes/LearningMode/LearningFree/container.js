import { connect } from 'react-redux';
import { processSetSettings as processSetUserSettings } from 'ReduxUtils/reducers/user';
import {
  processSetSettings as processSetLearningSettings,
  generateAndSetLessonForMode,
  setCurrentLessonFromCurrentMode,
  setMode,
  setCurrentLesson,
} from 'ReduxUtils/reducers/modes/learning';

import LearningFree from './component';

const mapStateToProps = (state) => {
  const stateFree = state.getIn(['learning', 'free']);

  return {
    example: stateFree.get('example'),
    options: stateFree.get('options').toJS(),
    keys: state.getIn(['main', 'keys']).toJS(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setMode: mode => dispatch(processSetUserSettings({ mode })),
  setLearningMode: (...args) => dispatch(setMode(...args)),
  setCurrentLesson: (...args) => dispatch(setCurrentLesson(...args)),
  updateOptions: (options) => {
    dispatch(processSetLearningSettings({
      free: {
        options,
      },
    }));

    dispatch(generateAndSetLessonForMode('free'));
  },
  start: () => {
    dispatch(processSetUserSettings({
      mode: 'learning',
    }));

    dispatch(processSetLearningSettings({
      mode: 'free',
    }));

    dispatch(setCurrentLessonFromCurrentMode());

    ownProps.history.push('/');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFree);
