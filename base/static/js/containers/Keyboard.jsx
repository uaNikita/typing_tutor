import {connect} from 'react-redux'
import {find} from 'lodash';
import Keyboard from '../components/Keyboard.jsx'
import {setKeyboard} from '../redux/modules/main'

const mapStateToProps = (state) => {
  return {
    keys: find(state.main.keyboards, {'name': state.main.keyboard}).keys,
    keyboardName: state.main.keyboard
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
