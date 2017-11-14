import { connect } from 'react-redux';
import { setAllData } from 'ReduxUtils/modules/main';
import { fetchJSON } from 'ReduxUtils/modules/fetch';
import Component from './component.jsx';

const mapDispatchToProps = dispatch => ({
  setAllData: (...args) => dispatch(setAllData(...args)),
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
