import { connect } from 'react-redux';
import { setStartTypingTime, zeroingStatic } from 'ReduxUtils/reducers/main';
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
    hiddenChars: state.getIn(['user', 'hiddenChars']),
  };
};

const mapDispatchToProps = dispatch => ({
  setStartTypingTime: (...args) => dispatch(setStartTypingTime(...args)),
  zeroingStatic: (...args) => dispatch(zeroingStatic(...args)),
  updateCharToType: (...args) => dispatch(updateCharToType(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
