import { connect } from 'react-redux';

import { processAddText } from 'ReduxUtils/reducers/modes/text';
import Component from './component';

const mapStateToProps = (state, { last, typed }) => ({
  initialValues: {
    text: last + typed,
  },
  selectedId: state.getIn(['text', 'selectedId']),
});

const mapDispatchToProps = dispatch => ({
  processAddText: (...args) => dispatch(processAddText(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
