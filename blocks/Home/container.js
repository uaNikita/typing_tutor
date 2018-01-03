import { connect } from 'react-redux';

import {
  typeChar,
  setStartTypingTime,
  zeroingStatic,
  setGlobalMessage,
} from 'ReduxUtils/modules/main';
import Component from './component.jsx';

const mapStateToProps = state => {
  const stateMain = state.get('main');

  return {
    mode: stateMain.get('mode'),
    email: state.getIn(['user', 'email']),
  };
};

const mapDispatchToProps = dispatch => ({
  typeChar: (...args) => dispatch(typeChar(...args)),
  setStartTypingTime: (...args) => dispatch(setStartTypingTime(...args)),
  zeroingStatic: (...args) => dispatch(zeroingStatic(...args)),
  setGlobalMessage: (...args) => dispatch(setGlobalMessage(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
