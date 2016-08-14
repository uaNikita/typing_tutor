import {connect} from 'react-redux'
import KeyPad from '../components/Keypad.jsx'

const mapStateToProps = (state) => {

  return {
    keyboardName: state.keyboardName,
    pressedRightIds: state.pressedRightIds,
    pressedWrongIds: state.pressedWrongIds,
    idCharsToType: state.idCharsToType
  }

}

export default connect(
  mapStateToProps
)(KeyPad)