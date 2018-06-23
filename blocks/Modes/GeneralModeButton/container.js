import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';

import Component from './component.jsx';

const mapStateToProps = state => ({
  currentMode: state.getIn(['user', 'mode']),
});

const mapDispatchToProps = dispatch => ({
  setMode: mode => dispatch(processSetSettings({ mode })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
