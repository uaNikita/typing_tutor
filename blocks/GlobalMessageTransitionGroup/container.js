import { connect } from 'react-redux';

import Component from './component.jsx';

const mapStateToProps = state => ({
  message: state.getIn(['main', 'globalMessage']),
});

export default connect(
  mapStateToProps,
)(Component);
