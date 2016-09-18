import {connect} from 'react-redux'
import {find} from 'lodash';
import KeyPad from '../components/Keypad.jsx'

const mapStateToProps = (state) => {

  return {
    keys: find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys,
    pressedRightIds: state.keyboard.pressedRightIds,
    pressedWrongIds: state.keyboard.pressedWrongIds,
    idCharsToType: state.keyboard.idCharsToType
  }

}

export default connect(
  mapStateToProps
)(KeyPad)