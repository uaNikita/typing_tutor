import { connect } from 'react-redux';

import { setState } from 'ReduxUtils/reducers/user';
import Keyboard from './component';

const mapStateToProps = state => ({
  keyboard: state.getIn(['user', 'keyboard']),
});

const mapDispatchToProps = dispatch => ({
  setKeyboard: keyboard => dispatch(setState({ keyboard })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Keyboard);
