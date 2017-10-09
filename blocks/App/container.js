import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setLastNoModalLocation } from 'ReduxUtils/modules/main';
import Component from './component.jsx';

const mapStateToProps = state => ({
  lastNoModalLocation: state.getIn(['main', 'lastNoModalLocation']),
});

const mapDispatchToProps = dispatch => ({
  setLastNoModalLocation: location => dispatch(setLastNoModalLocation(location)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component));
