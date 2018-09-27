import { connect } from 'react-redux';
import { init, setData } from 'ReduxUtils/reducers/main';
import { fetchJSON, setTokens } from 'ReduxUtils/reducers/fetch';
import Component from './component';

const mapDispatchToProps = dispatch => ({
  setTokens: (...args) => dispatch(setTokens(...args)),
  setData: (...args) => dispatch(setData(...args)),
  init: (...args) => dispatch(init(...args)),
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
