import {connect} from 'react-redux';
import {find} from 'lodash';
import KeyPad from '../components/Keypad.jsx';

const mapStateToProps = (state) => {

   return {
      keys: state.main.keys,
      pressedKeys: state.main.pressedKeys,
      pressedWrongKeys: state.main.pressedWrongKeys,
      idCharsToType: state.main.idCharsToType
   };

};

export default connect(
  mapStateToProps
)(KeyPad);