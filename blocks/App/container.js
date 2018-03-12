import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  setLastNoModalLocation,
  setIsModal,
  init,
  setMode,
} from 'ReduxUtils/modules/main';
import { setStatistic } from 'ReduxUtils/modules/user';
import { setState as setTextState } from 'ReduxUtils/modules/modes/text';
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
  setMode: (...args) => dispatch(setMode(...args)),
  setTextState: (...args) => dispatch(setTextState(...args)),
  setStatistic: (...args) => dispatch(setStatistic(...args)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component));
