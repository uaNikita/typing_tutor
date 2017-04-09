import { connect } from 'react-redux';
import Home from '../components/Home.jsx';
import { openModal } from '../redux/modules/main';

import { updateStartVariables } from '../redux/modules/main';
import { refreshCurrentLesson } from '../redux/modules/learning-mode';


const mapStateToProps = (state) => {

   const stateMain = state.get('main');

   const spendTime = (Date.now() - stateMain.get('startTypingTime')) / (1000 * 60);

   return {
      successTypes: stateMain.get('successTypes'),
      errorTypes: stateMain.get('errorTypes'),
      speed: parseInt((stateMain.get('successTypes') + stateMain.get('errorTypes')) / spendTime, 10),
      mode: stateMain.get('mode')
   };

};

const mapDispatchToProps = (dispatch) => {
   return {
      openModal: (name) => {
         dispatch(openModal(name));
      },
      updateStartVariables: (name) => {
         dispatch(updateStartVariables(name));
      },
      refreshCurrentLesson: (name) => {
         dispatch(refreshCurrentLesson(name));
      }
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Home);
