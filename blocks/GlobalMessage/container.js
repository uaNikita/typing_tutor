import { connect } from 'react-redux';

import { typeChar } from 'ReduxUtils/modules/main';
import Component from './component.jsx';

const mapStateToProps = state => ({
  message: state.getIn(['user', 'email']),
});

const mapDispatchToProps = dispatch => ({
  close: char => dispatch(typeChar(char)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
