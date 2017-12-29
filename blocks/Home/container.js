import { connect } from 'react-redux';

import { typeChar, setStartTypingTime, setGlobalMessage } from 'ReduxUtils/modules/main';
import Component from './component.jsx';

const mapStateToProps = state => {
  const stateMain = state.get('main');

  const spendTime = (Date.now() - stateMain.get('startTypingTime')) / (1000 * 60);

  return {
    successTypes: stateMain.get('successTypes'),
    errorTypes: stateMain.get('errorTypes'),
    speed: parseInt((stateMain.get('successTypes') + stateMain.get('errorTypes')) / spendTime, 10),
    mode: stateMain.get('mode'),
    email: state.getIn(['user', 'email']),
  };
};

const mapDispatchToProps = dispatch => ({
  typeChar: (...args) => dispatch(typeChar(...args)),
  setStartTypingTime: (...args) => dispatch(setStartTypingTime(...args)),
  setGlobalMessage: (...args) => dispatch(setGlobalMessage(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
