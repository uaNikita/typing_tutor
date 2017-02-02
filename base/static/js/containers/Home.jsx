import {connect} from 'react-redux'
import Home from '../components/Home.jsx'
import {openModal} from '../redux/modules/main'

const mapStateToProps = (state) => {
  let spendTime = (Date.now() - state.main.startTypingTime) / (1000 * 60);

  return {
    successTypes: state.main.successTypes,
    errorTypes: state.main.errorTypes,
    speed: parseInt((state.main.successTypes + state.main.errorTypes) / spendTime, 10),
    mode: state.main.mode
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
