import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/modules/fetch';

import { addText, selectText } from 'ReduxUtils/modules/text-mode';
import Component from './component.jsx';

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  addText: (...args) => dispatch(addText(...args)),
  selectText: (...args) => dispatch(selectText(...args)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
