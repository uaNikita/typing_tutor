import { connect } from 'react-redux';
import { updateCharToType } from 'ReduxUtils/reducers/modes/text';

import Component from './component';

const mapStateToProps = (state) => {
  const stateText = state.get('text');

  const text = stateText.get('entities')
    .filter(obj => obj.get('id') === stateText.get('selectedId'))
    .get(0);

  return {
    typed: text.get('typed'),
    last: text.get('last'),
  };
};

const mapDispatchToProps = dispatch => ({
  updateCharToType: (...args) => dispatch(updateCharToType(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
