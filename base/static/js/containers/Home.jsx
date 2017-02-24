import {connect} from 'react-redux'
import Home from '../components/Home.jsx'
import {openModal} from '../redux/modules/main'

const mapStateToProps = (state) => {

   const stateMain = state.get('main');

   const spendTime = (Date.now() - stateMain.get(['startTypingTime'])) / (1000 * 60);

   return {
      successTypes: stateMain.get('successTypes'),
      errorTypes: stateMain.get('errorTypes'),
      speed: parseInt((stateMain.get('successTypes') + stateMain.get('errorTypes')) / spendTime, 10),
      mode: stateMain.get('mode')
   }

}

const mapDispatchToProps = (dispatch) => {
   return {
      openModal: (name) => {
         dispatch(openModal(name))
      }
   }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
