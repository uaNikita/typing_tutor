import { connect } from 'react-redux';

import { processAddText } from 'ReduxUtils/reducers/modes/text';
import Component from './component';

const mapDispatchToProps = dispatch => ({
  processAddText: (...args) => dispatch(processAddText(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
