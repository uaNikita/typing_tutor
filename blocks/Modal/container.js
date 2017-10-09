import { connect } from 'react-redux';
import Component from './component.jsx';

const mapStateToProps = state => ({
  lastNoModalLocation: state.getIn(['main', 'lastNoModalLocation']),
});

export default connect(
  mapStateToProps,
)(Component);
