import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = state => ({
  showHiddenChars: state.getIn(['user', 'showHiddenChars']),
});

export default connect(
  mapStateToProps,
)(Component);
