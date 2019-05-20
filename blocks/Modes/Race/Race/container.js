import { connect } from 'react-redux';
import { typeChar } from 'ReduxUtils/reducers/main';

import Component from './component';

const mapStateToProps = state => ({
  id: state.getIn(['user', 'id']),
  anonymousToken: state.getIn(['fetch', 'anonymousToken']),
  keyboard: state.getIn(['user', 'keyboard']),
  socket: state.getIn(['race', 'socket']),
  idCharsToType: state.get('main').get('idCharsToType'),
});

const mapDispatchToProps = dispatch => ({
  typeChar: (...args) => dispatch(typeChar(...args)),
  setCharToType: (...args) => dispatch(setCharToType(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
