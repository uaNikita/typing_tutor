import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';

import Component from './component';

const mapStateToProps = state => ({
  mode: state.getIn(['user', 'mode']),
});

const mapDispatchToProps = dispatch => ({
  setMode: mode => dispatch(processSetSettings({ mode })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
