import {connect} from 'react-redux'
import {find} from 'lodash';
import KeyPad from '../components/Keypad.jsx'

const mapStateToProps = (state) => {

  return {
    keys: find(state.main.keyboards, {'name': state.main.keyboard}).keys,
    pressedRightIds: state.main.pressedRightIds,
    pressedWrongIds: state.main.pressedWrongIds,
    idCharsToType: state.main.idCharsToType
  }

}

export default connect(
  mapStateToProps
)(KeyPad)