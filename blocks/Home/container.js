import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = state => ({
  mode: state.getIn(['user', 'mode']),
});

export default connect(
  mapStateToProps,
)(Component);
