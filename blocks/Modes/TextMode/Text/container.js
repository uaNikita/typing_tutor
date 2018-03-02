import { connect } from 'react-redux';
import { processSelectText, processRefreshText } from 'ReduxUtils/modules/modes/text';
import Text from './component.jsx';

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.match.params.textId, 10);

  const stateTextMode = state.get('textMode');

  const text = stateTextMode.get('entities')
    .filter(obj => obj.get('id') === id)
    .get(0);

  return {
    id,
    typed: text.get('typed'),
    last: text.get('last'),
    selectedId: stateTextMode.get('selectedId'),
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
