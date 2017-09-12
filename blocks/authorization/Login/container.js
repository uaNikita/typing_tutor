import { connect } from 'react-redux';
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
  closeModal() {
    dispatch(closeModal());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
