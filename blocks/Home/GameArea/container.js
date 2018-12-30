import { connect } from 'react-redux';
import {
  setStartTypingTime,
  zeroingStatic,
  typeChar,
} from 'ReduxUtils/reducers/main';
import { updateCharToType } from 'ReduxUtils/reducers/modes/text';

import Component from './component';

const mapStateToProps = () => {
  return {
    text:1,
  };
};

const mapDispatchToProps = dispatch => ({
  setStartTypingTime: (...args) => dispatch(setStartTypingTime(...args)),
  zeroingStatic: (...args) => dispatch(zeroingStatic(...args)),
  typeChar: (...args) => dispatch(typeChar(...args)),
  updateCharToType: (...args) => dispatch(updateCharToType(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
