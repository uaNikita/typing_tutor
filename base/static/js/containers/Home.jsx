import {connect} from 'react-redux'
import Home from '../components/Home.jsx'
import {openModal} from '../actions/actions.js'

const mapStateToProps = (state) => {
  let spendTime = (Date.now() - state.keyboard.startTypingTime) / (1000 * 60);

  return {
    typedChars: state.keyboard.rightTypedChars,
    speed: parseInt((state.keyboard.rightTypedChars + state.keyboard.errors) / spendTime, 10),
    errors: state.keyboard.errors,
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
