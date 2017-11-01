import { connect } from 'react-redux';

import { setGlobalMessage } from 'ReduxUtils/modules/main';
import Component from './component.jsx';

const mapStateToProps = state => ({
  message: state.getIn(['main', 'globalMessage']),
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(setGlobalMessage('')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
