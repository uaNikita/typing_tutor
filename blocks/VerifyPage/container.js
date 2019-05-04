import { connect } from 'react-redux';
import { init, setData } from 'ReduxUtils/reducers/main';
import { fetchJSON, setState, logOut } from 'ReduxUtils/reducers/fetch';
import Component from './component';

const mapDispatchToProps = dispatch => ({
  setTokens: (...args) => dispatch(setState(...args)),
  setData: (...args) => dispatch(setData(...args)),
  logOut: (...args) => dispatch(logOut(...args)),
  init: (...args) => dispatch(init(...args)),
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
