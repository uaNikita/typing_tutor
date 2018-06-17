import { connect } from 'react-redux';
import Component from './component.jsx';

const mapStateToProps = state => {
  const userState = state.get('user');

  return {
    email: userState.get('email'),
    name: userState.get('name'),
  };
};

export default connect(
  mapStateToProps,
)(Component);
