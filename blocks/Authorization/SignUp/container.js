import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/reducers/fetch';
import Component from './component';

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
