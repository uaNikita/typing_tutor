import { connect } from 'react-redux';
import { processSetSettings as processSetUserSettings } from 'ReduxUtils/reducers/user';
import {
  processSetSettings as processSetSyllableSettings,
  generateAndSetLessonForMode,
  setCurrentLessonFromCurrentMode,
} from 'ReduxUtils/reducers/modes/syllable';

import Component from './component';

const mapStateToProps = (state) => {
  const stateFree = state.getIn(['syllable', 'free']);

  return {
    example: stateFree.get('example'),
    options: stateFree.get('options').toJS(),
    keys: state.getIn(['main', 'keys']).toJS(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateOptions: (options) => {
    dispatch(processSetSyllableSettings({
      free: {
        options,
      },
    }));

    dispatch(generateAndSetLessonForMode('free'));
  },
  start: () => {
    dispatch(processSetUserSettings({
      mode: 'syllable',
    }));

    dispatch(processSetSyllableSettings({
      mode: 'free',
    }));

    dispatch(setCurrentLessonFromCurrentMode());

    ownProps.history.push('/');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
