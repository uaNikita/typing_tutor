import {connect} from 'react-redux';
import KeyPad from './component.jsx';

const mapStateToProps = (state) => {

   const stateMain = state.get('main');

   return {
      keys: stateMain.get('keys'),
      pressedKeys: stateMain.get('pressedKeys').toJS(),
      pressedWrongKeys: stateMain.get('pressedWrongKeys').toJS(),
      idCharsToType: stateMain.get('idCharsToType')
   };

};

export default connect(
  mapStateToProps
)(KeyPad);