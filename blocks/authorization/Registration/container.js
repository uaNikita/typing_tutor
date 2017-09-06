import { connect } from 'react-redux';
import { setEmail, setBearerToken, setAccessToken } from 'ReduxUtils/modules/user';
import RegistrationForm from './component.jsx';

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
});

export default connect(
  null,
  mapDispatchToProps,
)(RegistrationForm);
