import { connect } from 'react-redux';

import { typeChar, updateStartVariables } from 'ReduxUtils/modules/main';
import { refreshCurrentLesson } from 'ReduxUtils/modules/learning-mode';
import Component from './component.jsx';

const mapStateToProps = state => {
  const stateMain = state.get('main');

  const spendTime = (Date.now() - stateMain.get('startTypingTime')) / (1000 * 60);

  return {
    successTypes: stateMain.get('successTypes'),
    errorTypes: stateMain.get('errorTypes'),
    speed: parseInt((stateMain.get('successTypes') + stateMain.get('errorTypes')) / spendTime, 10),
    mode: stateMain.get('mode'),
  };
};

const mapDispatchToProps = dispatch => ({
  typeChar(char) {
    dispatch(typeChar(char));
  },
  updateStartVariables(name) {
    dispatch(updateStartVariables(name));
  },
  refreshCurrentLesson(name) {
    dispatch(refreshCurrentLesson(name));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
