import { connect } from 'react-redux';
import { fetchJSON, setRefreshToken, setAccessToken } from 'ReduxUtils/modules/fetch';
import { setEmail } from 'ReduxUtils/modules/user';
import Component from './component.jsx';

const mapStateToProps = state => ({
  isModal: state.getIn(['main', 'isModal']),
});

const mapDispatchToProps = dispatch => ({
  setRefreshToken: token => dispatch(setRefreshToken(token)),
  setAccessToken: token => dispatch(setAccessToken(token)),
  setEmail: email => dispatch(setEmail(email)),
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
