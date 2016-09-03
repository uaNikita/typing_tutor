import {connect} from 'react-redux'
import Home from '../components/Home.jsx'
import {openModal} from '../actions/actions.js'

const mapStateToProps = (state) => {
  let spendTime = (Date.now() - state.keyboard.startTypingTime) / (1000 * 60);
  
  return {
    successTypes: state.keyboard.successTypes,
    errorTypes: state.keyboard.errorTypes,
    speed: parseInt((state.keyboard.successTypes + state.keyboard.errorTypes) / spendTime, 10),
    mode: state.keyboard.mode
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
