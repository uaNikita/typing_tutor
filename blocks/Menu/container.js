import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from './component.jsx';

const mapStateToProps = state => ({
  email: state.getIn(['user', 'email']),
});

export default withRouter(connect(
  mapStateToProps,
)(Component));
