import { connect } from 'react-redux';

import { processSetMode } from 'ReduxUtils/reducers/user';

import Component from './component.jsx';

const mapStateToProps = state => ({
  mode: state.getIn(['user', 'mode']),
});

const mapDispatchToProps = dispatch => ({
  setMode: (...args) => dispatch(processSetMode(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
