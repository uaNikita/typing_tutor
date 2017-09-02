import { connect } from 'react-redux';
import { openModal } from 'ReduxUtils/modules/modal';
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
  openModal(...args) {
    dispatch(openModal(...args));
  },
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
