import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = state => ({
  keyboard: state.getIn(['user', 'keyboard']),
  socket: state.getIn(['race', 'socket']),
});

export default connect(
  mapStateToProps,
  null,
)(Component);
