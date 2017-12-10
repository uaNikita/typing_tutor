import { connect } from 'react-redux';

import { addText, selectLastText } from 'ReduxUtils/modules/text-mode';
import Component from './component.jsx';

const mapDispatchToProps = dispatch => ({
  addText: (...args) => dispatch(addText(...args)),
  selectAddedText: () => dispatch(selectLastText()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
