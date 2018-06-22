import { connect } from 'react-redux';

import {
  typeChar,
  setStartTypingTime,
  zeroingStatic,
  startNewSession,
} from 'ReduxUtils/reducers/main';
import Component from './component.jsx';

const mapStateToProps = state => {
  const uaerState = state.get('user');

  return {
    mode: uaerState.get('mode'),
    email: uaerState.get('email'),
  };
};

const mapDispatchToProps = dispatch => ({
  typeChar: (...args) => dispatch(typeChar(...args)),
  setStartTypingTime: (...args) => dispatch(setStartTypingTime(...args)),
  zeroingStatic: (...args) => dispatch(zeroingStatic(...args)),
  startNewSession: (...args) => dispatch(startNewSession(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
