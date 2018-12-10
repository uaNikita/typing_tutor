import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';
import { getKeysFromKeyboard } from 'ReduxUtils/reducers/main';
import { initLessons } from 'ReduxUtils/reducers/modes/syllable';

import Keyboard from './component';

const mapStateToProps = state => ({
  keys: state.getIn(['main', 'keys']).toJS(),
  initialValues: {
    keyboard: state.getIn(['user', 'keyboard']),
  },
});

const mapDispatchToProps = dispatch => ({
  setKeyboard: (keyboard) => {
    dispatch(processSetSettings({ keyboard }));
    dispatch(getKeysFromKeyboard());
    dispatch(initLessons());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Keyboard);
