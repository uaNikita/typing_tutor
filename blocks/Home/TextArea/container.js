import { connect } from 'react-redux';
import { updateCharToType } from 'ReduxUtils/modules/modes/text';

import Component from './component.jsx';

const mapStateToProps = state => {
  const stateTextMode = state.get('textMode');

  const text = stateTextMode.get('entities')
    .filter(obj => obj.get('id') === stateTextMode.get('selectedId'))
    .get(0);

  return {
    typed: text.get('typed'),
    nonTyped: text.get('last'),
  };
};

const mapDispatchToProps = dispatch => ({
  updateCharToType: (...args) => dispatch(updateCharToType(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
