import { connect } from 'react-redux';
import { setAllWithoutAuth } from 'ReduxUtils/reducers/main';
import { fetchJSON, setTokens } from 'ReduxUtils/reducers/fetch';
import Component from './component';

const mapDispatchToProps = dispatch => ({
  setTokens: (...args) => dispatch(setTokens(...args)),
  setAllWithoutAuth: (...args) => dispatch(setAllWithoutAuth(...args)),
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
