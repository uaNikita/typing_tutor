import { connect } from 'react-redux';
import {
  setStartTypingTime,
  zeroingStatic,
  typeChar,
  setCharToType,
  addTouch,
} from 'ReduxUtils/reducers/main';

import { processAddStatistic } from 'ReduxUtils/reducers/user';

import Component from './component';

const mapStateToProps = state => ({
  keyboard: state.getIn(['user', 'keyboard']),
  sessionStart: state.getIn(['main', 'sessionStatistic', 'start']),
});

const mapDispatchToProps = dispatch => ({
  setStartTypingTime: (...args) => dispatch(setStartTypingTime(...args)),
  zeroingStatic: (...args) => dispatch(zeroingStatic(...args)),
  typeChar: (...args) => dispatch(typeChar(...args)),
  setCharToType: (...args) => dispatch(setCharToType(...args)),
  addTouch: (...args) => dispatch(addTouch(...args)),
  processAddStatistic: (...args) => dispatch(processAddStatistic(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
