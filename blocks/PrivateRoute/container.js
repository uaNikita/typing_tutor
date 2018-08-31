import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = state => ({
  email: state.getIn(['user', 'email']),
});

export default connect(
  mapStateToProps,
)(Component);
