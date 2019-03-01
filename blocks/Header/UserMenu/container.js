import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = state => ({
  refreshToken: state.getIn(['fetch', 'refreshToken']),
});

export default connect(
  mapStateToProps,
)(Component);
