import { connect } from 'react-redux';

import { fetchJSON } from 'ReduxUtils/modules/fetch';

import Component from './component.jsx';


const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
