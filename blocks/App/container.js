import { connect } from 'react-redux';

import { setState as setTextState } from 'ReduxUtils/reducers/modes/text';

import Component from './component';

const mapDispatchToProps = dispatch => ({
  setTextState: (...args) => dispatch(setTextState(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
