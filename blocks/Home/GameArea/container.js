import { connect } from 'react-redux';
import {
  setStartTypingTime,
  zeroingStatic,
  typeChar,
} from 'ReduxUtils/reducers/main';

import Component from './component';

const mapStateToProps = (state) => {
  return {
    keyboard: state.getIn(['user', 'keyboard']),
  };
};

const mapDispatchToProps = dispatch => ({
  setStartTypingTime: (...args) => dispatch(setStartTypingTime(...args)),
  zeroingStatic: (...args) => dispatch(zeroingStatic(...args)),
  typeChar: (...args) => dispatch(typeChar(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
