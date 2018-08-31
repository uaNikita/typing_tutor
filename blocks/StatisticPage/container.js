import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = (state) => {
  const stateMain = state.get('main');

  return {
    mode: state.getIn(['user', 'mode']),
    keys: stateMain.get('keys').toJS(),
    name: stateMain.get('keyboard'),
  };
};

export default connect(
  mapStateToProps,
)(Component);
