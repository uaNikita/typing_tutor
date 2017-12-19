import { connect } from 'react-redux';

import { processAddText } from 'ReduxUtils/modules/text-mode';
import Component from './component.jsx';

const mapDispatchToProps = dispatch => ({
  processAddText: (...args) => dispatch(processAddText(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
