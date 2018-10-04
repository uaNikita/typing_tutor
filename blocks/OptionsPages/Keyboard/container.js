import { connect } from 'react-redux';

import { setState } from 'ReduxUtils/reducers/user';
import { initLessons } from 'ReduxUtils/reducers/modes/learning';

import Keyboard from './component';

const mapStateToProps = state => ({
  keyboard: state.getIn(['user', 'keyboard']),
});

const mapDispatchToProps = dispatch => ({
  setKeyboard: (keyboard) => {
    dispatch(setState({ keyboard }));
    dispatch(initLessons());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Keyboard);
