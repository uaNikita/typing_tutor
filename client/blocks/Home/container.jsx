import { connect } from 'react-redux';

import { openModal } from 'Redux/modules/modal';
import { typeChar, updateStartVariables } from 'Redux/modules/main';
import { refreshCurrentLesson } from 'Redux/modules/learning-mode';
import Home from './component.jsx';

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

const mapDispatchToProps = dispatch => (
  {
    openModal(...args) {
      dispatch(openModal(...args));
    },
    typeChar(char) {
      dispatch(typeChar(char));
    },
    updateStartVariables(name) {
      dispatch(updateStartVariables(name));
    },
    refreshCurrentLesson(name) {
      dispatch(refreshCurrentLesson(name));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
