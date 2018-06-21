import { connect } from 'react-redux';

import { fetchJSON } from 'ReduxUtils/modules/fetch';
import { setGlobalMessage } from 'ReduxUtils/modules/main';
import Component from './component.jsx';

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  setGlobalMessage: (...args) => dispatch(setGlobalMessage(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
