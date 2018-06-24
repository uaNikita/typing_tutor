import { connect } from 'react-redux';

import { fetchJSON } from 'ReduxUtils/reducers/fetch';
import { setGlobalMessage } from 'ReduxUtils/reducers/main';
import Component from './component';

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  setGlobalMessage: (...args) => dispatch(setGlobalMessage(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
