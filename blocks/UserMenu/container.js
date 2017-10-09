import { connect } from 'react-redux';
import { setEmail, setBearerToken, setAccessToken } from 'ReduxUtils/modules/user';
import Component from './component.jsx';

const mapStateToProps = state => {
  const userState = state.get('user');

  return {
    email: userState.get('email'),
    name: userState.get('name'),
  };
};

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(setEmail(false));
    dispatch(setBearerToken(false));
    dispatch(setAccessToken(false));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
