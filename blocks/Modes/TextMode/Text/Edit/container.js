import { connect } from 'react-redux';

import { processUpdateText } from 'ReduxUtils/reducers/modes/text';
import Component from './component';

const mapStateToProps = (state, { last, typed }) => ({
  initialValues: {
    text: last + typed,
  },
  selectedId: state.getIn(['text', 'selectedId']),
});

const mapDispatchToProps = dispatch => ({
  updateText: (...args) => dispatch(processUpdateText(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
