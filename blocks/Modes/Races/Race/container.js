import { connect } from 'react-redux';

import { getNewTokens } from 'ReduxUtils/reducers/fetch';
import { processSetSettings } from 'ReduxUtils/reducers/user';

import Component from './component';

const mapStateToProps = state => ({
  keyboard: state.getIn(['user', 'keyboard']),
  socket: state.getIn(['race', 'socket']),
});

export default connect(
  mapStateToProps,
  null,
)(Component);
