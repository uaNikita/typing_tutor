import { connect } from 'react-redux';

import { setGlobalMessage } from 'ReduxUtils/reducers/main';
import Component from './component';

const mapStateToProps = state => ({
  message: state.getIn(['main', 'globalMessage']),
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(setGlobalMessage(false)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
