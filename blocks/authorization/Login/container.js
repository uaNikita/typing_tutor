import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/modules/fetch';
import { closeModal } from 'ReduxUtils/modules/modal';
import { setEmail, setBearerToken, setAccessToken } from 'ReduxUtils/modules/user';
import Component from './component.jsx';

const mapDispatchToProps = dispatch => ({
  setEmail: email => {
    dispatch(setEmail(email));
  },
  setBearerToken: token => {
    dispatch(setBearerToken(token));
  },
  setAccessToken: token => {
    dispatch(setAccessToken(token));
  },
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  closeModal() {
    dispatch(closeModal());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
