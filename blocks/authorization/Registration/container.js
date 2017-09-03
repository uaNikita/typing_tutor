import { connect } from 'react-redux';
import { setEmail, setBearerToken, setAccessToken } from 'ReduxUtils/modules/user';
import RegistrationForm from './component.jsx';

const mapDispatchToProps = dispatch => ({
  setEmail: email => {
    dispatch(setEmail(email));

    localStorage.setItem('email', email);
  },
  setBearerToken: token => {
    dispatch(setBearerToken(token));

    localStorage.setItem('bearerToken', token);
  },
  setAccessToken: token => {
    dispatch(setAccessToken(token));

    localStorage.setItem('accessToken', token);
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(RegistrationForm);
