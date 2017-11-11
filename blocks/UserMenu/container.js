import { connect } from 'react-redux';
import { setEmail } from 'ReduxUtils/modules/user';
import { setRefreshToken, setAccessToken } from 'ReduxUtils/modules/fetch';
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
    dispatch(setRefreshToken(false));
    dispatch(setAccessToken(false));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
