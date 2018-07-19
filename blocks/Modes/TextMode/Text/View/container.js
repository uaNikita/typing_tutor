import { connect } from 'react-redux';
import { processSelectText, processRefreshText } from 'ReduxUtils/reducers/modes/text';
import Text from './component';

const mapStateToProps = state => ({
  selectedId: state.getIn(['text', 'selectedId']),
});

const mapDispatchToProps = dispatch => ({
  selectText: (...args) => dispatch(processSelectText(...args)),
  refreshText: (...args) => dispatch(processRefreshText(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Text);
