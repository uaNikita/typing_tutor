import { connect } from 'react-redux';
import { processSetSettings as processSetUserSettings } from 'ReduxUtils/reducers/user';
import {
  processSetSettings as processSetSyllableSettings,
  generateAndSetLessonForMode,
  setCurrentLessonFromCurrentMode,
} from 'ReduxUtils/reducers/modes/syllable';

import { getFingersSet } from 'Utils';

import Component from './component';

const mapStateToProps = state => {
  const keys = state.getIn(['main', 'keys']).toJS();
  const stateFingers = state.getIn(['syllable', 'fingers']);

  return {
    example: stateFingers.get('example'),
    options: stateFingers.get('options').toJS(),
    fingersSet: getFingersSet(keys),
    keys,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateOptions: options => {
    dispatch(processSetSyllableSettings({
      fingers: {
        options,
      },
    }));

    dispatch(generateAndSetLessonForMode('fingers'));
  },
  start: () => {
    dispatch(processSetUserSettings({
      mode: 'syllable',
    }));

    dispatch(processSetSyllableSettings({
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
