import { connect } from 'react-redux';
import { fetchJSON, setRefreshToken, setAccessToken } from 'ReduxUtils/modules/fetch';
import { setEmail } from 'ReduxUtils/modules/user';
import { closeModal } from 'ReduxUtils/modules/modal';
import Component from './component.jsx';

const mapDispatchToProps = dispatch => ({
  setRefreshToken: token => dispatch(setRefreshToken(token)),
  setAccessToken: token => dispatch(setAccessToken(token)),
  setEmail: email => dispatch(setEmail(email)),
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
