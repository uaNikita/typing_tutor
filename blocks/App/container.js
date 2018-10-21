import { connect } from 'react-redux';

import { setState as setTextState } from 'ReduxUtils/reducers/modes/text';
import { setState as setUserState } from 'ReduxUtils/reducers/user';

import Component from './component';

const mapDispatchToProps = dispatch => ({
  setUserState: (...args) => dispatch(setUserState(...args)),
  setTextState: (...args) => dispatch(setTextState(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
