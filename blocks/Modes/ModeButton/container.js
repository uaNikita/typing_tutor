import { connect } from 'react-redux';

import { setMode } from 'ReduxUtils/modules/main';

import Component from './component.jsx';

const mapStateToProps = state => ({
  mode: state.getIn(['main', 'mode']),
});

const mapDispatchToProps = dispatch => ({
  setMode: (...args) => dispatch(setMode(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
