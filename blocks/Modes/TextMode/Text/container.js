import { connect } from 'react-redux';
import { selectText, refreshText } from 'ReduxUtils/modules/text-mode';
import Text from './component.jsx';

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.textId;

  const stateTextMode = state.get('textMode');

  const text = stateTextMode.get('entities').filter(obj => obj.get('id') === parseInt(id, 10)).get(0);

  return {
    id,
    typed: text.get('typed'),
    last: text.get('last'),
    selectedId: stateTextMode.get('selectedId'),
  };
};

const mapDispatchToProps = dispatch => ({
  selectText: (...args) => dispatch(selectText(...args)),
  refreshText: (...args) => dispatch(refreshText(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Text);
