import { connect } from 'react-redux';

import { setState } from 'ReduxUtils/reducers/user';
import { getKeysFromKeyboard } from 'ReduxUtils/reducers/main';
import { initLessons } from 'ReduxUtils/reducers/modes/learning';

import Keyboard from './component';

const mapStateToProps = state => ({
  keys: state.getIn(['main', 'keys']).toJS(),
});

const mapDispatchToProps = dispatch => ({
  setKeyboard: (keyboard) => {
    dispatch(setState({ keyboard }));
    dispatch(getKeysFromKeyboard());
    dispatch(initLessons());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Keyboard);
