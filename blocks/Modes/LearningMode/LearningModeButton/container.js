import { connect } from 'react-redux';

import { setMode } from 'ReduxUtils/reducers/modes/learning';

import Component from './component';

const mapStateToProps = state => ({
  currentMode: state.getIn(['learning', 'mode']),
});

const mapDispatchToProps = dispatch => ({
  setMode: (...args) => dispatch(setMode(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
