import { connect } from 'react-redux';
import { processSelectText, processRefreshText } from 'ReduxUtils/modules/modes/text';
import Text from './component.jsx';

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.match.params.textId, 10);

  const stateText = state.get('text');

  const text = stateText.get('entities')
    .filter(obj => obj.get('id') === id)
    .get(0);

  return {
    id,
    typed: text.get('typed'),
    last: text.get('last'),
    selectedId: stateText.get('selectedId'),
  };
};

const mapDispatchToProps = dispatch => ({
  selectText: (...args) => dispatch(processSelectText(...args)),
  refreshText: (...args) => dispatch(processRefreshText(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Text);
