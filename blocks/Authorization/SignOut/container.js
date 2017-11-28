import { connect } from 'react-redux';
import { logOut } from 'ReduxUtils/modules/fetch';
import Component from './component.jsx';

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
