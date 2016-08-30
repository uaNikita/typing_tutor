import {connect} from 'react-redux'
import KeyPad from '../components/Keypad.jsx'

const mapStateToProps = (state) => {

  return {
    keyboardName: state.keyboard.keyboardName,
    pressedRightIds: state.keyboard.pressedRightIds,
    pressedWrongIds: state.keyboard.pressedWrongIds,
    idCharsToType: state.keyboard.idCharsToType
  }

}

export default connect(
  mapStateToProps
)(KeyPad)