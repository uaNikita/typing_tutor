import { connect } from 'react-redux';

import { selectText } from 'ReduxUtils/modules/text-mode';
import Texts from './component.jsx';

const mapStateToProps = state => {
  const stateTextMode = state.get('textMode');

  const texts = stateTextMode.get('entities').toJS().map(obj => ({
    textId: obj.id,
    title: obj.title,
    text: obj.typed + obj.last,
  }));

  return {
    texts,
    currentTextId: stateTextMode.get('currentTextId'),
  };
};

const mapDispatchToProps = dispatch => ({
  selectText: textId => {
    dispatch(selectText(textId));
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Texts);
