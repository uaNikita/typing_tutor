import { connect } from 'react-redux';
import {
  setStartTypingTime,
  zeroingStatic,
  typeChar,
} from 'ReduxUtils/reducers/main';
import { updateCharToType } from 'ReduxUtils/reducers/modes/text';

import Component from './component';

const mapStateToProps = (state) => {
  const stateText = state.get('text');
  const entities = stateText.get('entities');

  let text;

  if (entities) {
    text = entities
      .filter(obj => obj.get('id') === stateText.get('selectedId'))
      .get(0)
      .toJS();
  }

  return {
    text,
    hiddenChars: state.getIn(['user', 'hiddenChars']),
  };
};

const mapDispatchToProps = dispatch => ({
  setStartTypingTime: (...args) => dispatch(setStartTypingTime(...args)),
  zeroingStatic: (...args) => dispatch(zeroingStatic(...args)),
  typeChar: (...args) => dispatch(typeChar(...args)),
  updateCharToType: (...args) => dispatch(updateCharToType(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
