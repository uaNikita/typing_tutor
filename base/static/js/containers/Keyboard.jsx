import {connect} from 'react-redux'
import Keyboard from '../components/Keyboard.jsx'
import {setKeyboard} from '../actions/main'

const mapStateToProps = (state) => {
  return {
    keyboardName: state.keyboardName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setKeyboard: (name) => {
      dispatch(setKeyboard(name))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Keyboard)
