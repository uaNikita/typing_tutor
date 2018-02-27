import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setLastNoModalLocation, setIsModal, init } from 'ReduxUtils/modules/main';
import Component from './component.jsx';

const mapStateToProps = state => ({
  email: state.getIn(['user', 'email']),
  lastNoModalLocation: state.getIn(['main', 'lastNoModalLocation']),
  isModal: state.getIn(['main', 'isModal']),
});

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(init()),
  setLastNoModalLocation: location => dispatch(setLastNoModalLocation(location)),
  setIsModal: modal => dispatch(setIsModal(modal)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component));
