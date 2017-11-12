import { connect } from 'react-redux';
import { selectText, refreshText } from 'ReduxUtils/modules/text-mode';
import Text from './component.jsx';

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.textId;

  const stateTextMode = state.get('textMode');

  const text = stateTextMode.get('entities').filter(obj => obj.get('id') === parseInt(id, 10)).get(0);

  return {
    id,
    title: text.get('title'),
    typed: text.get('typed'),
    last: text.get('last'),
    currentTextId: stateTextMode.get('currentTextId'),
  };
};

const mapDispatchToProps = dispatch => ({
  selectText: textId => {
    dispatch(selectText(textId));
  },
  refreshText: textId => {
    dispatch(refreshText(textId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Text);
