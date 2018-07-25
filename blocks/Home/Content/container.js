import { connect } from 'react-redux';
import { updateCharToType } from 'ReduxUtils/reducers/modes/text';

import Component from './component';

// const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({
  updateCharToType: (...args) => dispatch(updateCharToType(...args)),
});

export default connect(
  // mapStateToProps,
  mapDispatchToProps,
)(Component);
