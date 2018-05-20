import { connect } from 'react-redux';

import { setMode } from 'ReduxUtils/modules/modes/learning';

import Component from './component.jsx';

const mapStateToProps = state => ({
  currentMode: state.getIn(['learningMode', 'mode']),
});

const mapDispatchToProps = dispatch => ({
  setMode: (...args) => dispatch(setMode(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
