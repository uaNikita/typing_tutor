import { connect } from 'react-redux';

import { fetchJSON, logOut } from 'ReduxUtils/reducers/fetch';
import { setGlobalMessage } from 'ReduxUtils/reducers/main';
import Component from './component';

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  setGlobalMessage: (...args) => dispatch(setGlobalMessage(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
