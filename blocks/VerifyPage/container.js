import { connect } from 'react-redux';
import { setAllWithAuth } from 'ReduxUtils/reducers/main';
import { fetchJSON } from 'ReduxUtils/reducers/fetch';
import Component from './component.jsx';

const mapDispatchToProps = dispatch => ({
  setAllWithAuth: (...args) => dispatch(setAllWithAuth(...args)),
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
