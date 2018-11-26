import { connect } from 'react-redux';
import { processSetSettings as processSetUserSettings } from 'ReduxUtils/reducers/user';
import {
  processSetSettings as processSetLearningSettings,
  generateAndSetLessonForMode,
  setCurrentLessonFromCurrentMode,
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateOptions: (options) => {
    dispatch(processSetLearningSettings({
      fingers: {
        options,
      },
    }));

    dispatch(generateAndSetLessonForMode('fingers'));
  },
  start: () => {
    dispatch(processSetUserSettings({
      mode: 'learning',
    }));

    dispatch(processSetLearningSettings({
      mode: 'fingers',
    }));

    dispatch(setCurrentLessonFromCurrentMode());

    ownProps.history.push('/');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
