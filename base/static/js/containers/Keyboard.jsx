import {connect} from 'react-redux'
import {find} from 'lodash';
import Keyboard from '../components/Keyboard.jsx'
import {setKeyboard} from '../actions/main'

const mapStateToProps = (state) => {
  return {
    keys: find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys,
    keyboardName: state.keyboard.keyboardName
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
