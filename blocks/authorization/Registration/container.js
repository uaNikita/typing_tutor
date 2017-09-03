import { connect } from 'react-redux';
import { openModal } from 'ReduxUtils/modules/modal';
import RegistrationForm from './component.jsx';

import { setEmail, setBearerToken, setAccessToken } from 'ReduxUtils/modules/user';


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
