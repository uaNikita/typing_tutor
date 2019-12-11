import { connect } from 'react-redux';

import KeyPad from './component';

const mapStateToProps = state => {
  const stateMain = state.get('main');

  return {
    keys: stateMain.get('keys').toJS(),
    pressedKeys: stateMain.get('pressedKeys').toJS(),
    pressedWrongKeys: stateMain.get('pressedWrongKeys').toJS(),
    idCharsToType: stateMain.get('idCharsToType'),
  };
};

export default connect(
  mapStateToProps,
)(KeyPad);
