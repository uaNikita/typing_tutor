import { connect } from 'react-redux';
import Component from './component.jsx';

const mapStateToProps = state => ({
  email: state.getIn(['user', 'email']),
});

export default connect(
  mapStateToProps,
)(Component);
