import { connect } from 'react-redux';

import { processSetMode } from 'ReduxUtils/modules/user';

import Component from './component.jsx';

const mapStateToProps = state => ({
  currentMode: state.getIn(['user', 'mode']),
});

const mapDispatchToProps = dispatch => ({
  setMode: (...args) => dispatch(processSetMode(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
